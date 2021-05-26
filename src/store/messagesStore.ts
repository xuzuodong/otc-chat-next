/**
 * 全局消息管理
 */

import { MessageContent } from '@/types/chat-message'
import { reactive, UnwrapNestedRefs, Ref, ref } from '@vue/reactivity'
import { from, orderid, target, token } from '@/store/appCallerStore'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import encodeChatMessage from '@/utils/fzm-message-protocol-chat/encodeChatMessage'
import { v4 as uuidv4 } from 'uuid'
import { connectionState } from './connectionStore'
import { uploadFile, abortUploadFile } from './ossStore'
import { dtalk } from '@/utils/fzm-message-protocol-chat/protobuf'
import { date } from 'quasar'
import { Checkpoint } from 'ali-oss'
import axios, { AxiosResponse } from 'axios'
import { ChatRecordBody } from '@/types/record'
import { baseUrl } from './baseUrl'

/** 多媒体消息的上传进度 */
export interface UploadProgress {
    /** 上传百分比，值为 0 ~ 100 */
    percentage: number
    /** OSS 分片上传产生的碎片 */
    checkpoint?: Checkpoint
}

/** MessageStore 存储的数据结构 */
export interface DisplayMessage {
    /** 消息内容，不同的消息类型有不同的结构 */
    content: MessageContent | UnwrapNestedRefs<MessageContent>
    /** 我的 id */
    from: string
    /** 本条消息的 uuid */
    uuid: string
    /** 显示在用户界面上的消息发送状态，对方发来的消息无状态，用 null 表示 */
    state: 'pending' | 'success' | 'failure' | null
    /** 多媒体消息的上传进度, 值为 0 ~ 1 */
    uploadProgress?: UploadProgress
    /** 消息类型 */
    type: ChatMessageTypes
    /** 消息发送时间 */
    datetime: number
    /** 是否隐藏消息时间 */
    hideDatetime?: boolean
    /** 消息发送成功后，后端赋予该消息的唯一 id */
    logid?: string
}

class MessageStore {
    messages: UnwrapNestedRefs<DisplayMessage[]>
    /** 标记是否还有更多历史消息 */
    noMoreHistoryMessages: Ref<boolean>
    /** 一次向服务器请求消息的数量 */
    retrieveLength = 10
    /** 记录最后一次添加数据的操作是否为新数据，当数据变化时根据此属性来判断是否滚动至最底部 */
    appendingNewMessage: Ref<boolean>

    constructor() {
        this.messages = reactive<DisplayMessage[]>([])
        this.appendingNewMessage = ref(true)
        this.noMoreHistoryMessages = ref(false)
    }

    private shouldDisplayMessageDate(latterDate: number, formerDate: number): boolean {
        return date.getDateDiff(latterDate, formerDate, 'seconds') < 120
    }

    /** 判断一条消息是否已在显示列表中 */
    private isMessageDuplicated(message: DisplayMessage) {
        return !!this.messages.find((m) => m.uuid === message.uuid)
    }

    /** 新消息入数组 */
    displayNewMessage(message: DisplayMessage) {
        if (this.isMessageDuplicated(message)) return

        // 和上条消息发送间隔小于 2 分钟的隐藏显示时间
        if (this.messages.length) {
            const lastMsg = this.messages[this.messages.length - 1]
            message.hideDatetime = this.shouldDisplayMessageDate(message.datetime, lastMsg.datetime)
        }
        this.messages.push(message)
        this.appendingNewMessage.value = true
    }

    /**
     * 委托 connectionState 帮忙发送消息，并在界面上显示发出的消息
     * @param type 消息类型
     * @param content 消息内容，需根据类型填写对应字段
     * @param uuid 如果传入 uuid 则说明是重新发送之前失败的消息
     */
    sendMessage(type: ChatMessageTypes, content: MessageContent, uuid?: string) {
        const _uuid = uuid || uuidv4()

        /** 聊天界面显示的消息 */
        let message: UnwrapNestedRefs<DisplayMessage>

        /** 之前发送失败的消息 */
        const existingMessage = uuid && this.messages.find((m) => m.uuid === _uuid)

        // 如果是老消息，找出来赋给 displayMessage
        if (existingMessage) {
            existingMessage.state = 'pending'
            message = existingMessage
        }
        // 如果是新消息，新建一个 displayMessage
        else {
            message = reactive<DisplayMessage>({
                content,
                from,
                uuid: _uuid,
                state: 'pending' as 'pending' | 'success' | 'failure' | null,
                type,
                datetime: Date.now(),
                uploadProgress: { percentage: 0 },
            })
            this.displayNewMessage(message)
        }

        // 多媒体类的消息（语音、图片、视频）上传阿里云 OSS，取得 url，发送 url
        if (type !== ChatMessageTypes.Text && type !== ChatMessageTypes.Card) {
            // 特殊情况处理：当发送微信和支付宝收款方式时，由于是直接从后端拿到的图片外链，所以直接发送
            if (!content.rawMessage) {
                if (type === ChatMessageTypes.Image && (<dtalk.proto.IAudioMsg>content).mediaUrl)
                    this.send(type, content, _uuid, message)
                return
            }

            uploadFile(content.rawMessage, type, this.updateProgress(message))
                .then((url) => {
                    // 如果用户提前终止了本次上传
                    if (message.state === 'failure') return

                    console.log(`阿里云 OSS 上传成功, ${url}`)

                    if (type === ChatMessageTypes.Audio) {
                        ;(<dtalk.proto.IAudioMsg>content).mediaUrl = url
                    } else if (type === ChatMessageTypes.Image) {
                        ;(<dtalk.proto.IImageMsg>content).mediaUrl = url
                    } else if (type === ChatMessageTypes.Video) {
                        ;(<dtalk.proto.IVideoMsg>content).mediaUrl = url
                    }
                    this.send(type, content, _uuid, message)
                })
                .catch((err) => {
                    console.log(err)
                    message.state = 'failure'
                })
        }
        // 文本类消息，不需要上传 OSS，直接发送
        else {
            this.send(type, content, _uuid, message)
        }
    }

    /** 从后端拉取之前的聊天记录 */
    public retrieveMessages(): Promise<void> {
        this.appendingNewMessage.value = this.messages.length ? false : true
        return new Promise((resolve, reject) => {
            const logid = this.messages.length ? this.messages[0].logid : undefined
            let url = `/record/chatrecord?uid=${from}&orderId=${orderid}&count=${this.retrieveLength}`
            // 加时间戳防止部分机型缓存 http 请求
            url += `&timestamp=${Date.now()}`
            axios({
                method: 'get',
                url: logid ? url + `&logId=${logid}` : url,
            })
                .then((res: AxiosResponse<ChatRecordBody>) => {
                    // data.result 中的最后一条消息是最老的，也就是需要放在 this.messages 的最前面
                    res.data.data.result.forEach((record) => {
                        const message: DisplayMessage = {
                            content: record.content,
                            from: record.user_id,
                            uuid: record.msg_id,
                            state: null,
                            type: record.msg_type,
                            datetime: record.create_time,
                            hideDatetime: false,
                            logid: record.log_id,
                        }

                        if (this.isMessageDuplicated(message)) return

                        this.messages.unshift(message)

                        // 新插入的消息和下面那条消息比较时间，小于两分钟就隐藏下面那条消息的时间
                        const underMessage = this.messages[1]
                        if (underMessage) {
                            underMessage.hideDatetime = this.shouldDisplayMessageDate(
                                underMessage.datetime,
                                record.create_time
                            )
                        }
                    })
                    // 标记是否还有更多历史消息
                    if (res.data.data.record_count < 10) {
                        this.noMoreHistoryMessages.value = true
                    }
                    resolve()
                })
                .catch((res) => {
                    reject(res)
                })
        })
    }

    /**
     * 用户主动终止上传
     * @param uuid 终止的消息 id
     * @param checkpoint 分片片段
     */
    abortSendingMessage(uuid: string, checkpoint: Checkpoint) {
        abortUploadFile(checkpoint)
        const message = this.messages.find((m) => m.uuid == uuid)
        if (message) {
            message.state = 'failure'
            message.uploadProgress = undefined
        }
    }

    /** 编码并发送 */
    private send(type: ChatMessageTypes, content: MessageContent, uuid: string, message: DisplayMessage) {
        // console.log(from, target)

        const chatMessageData = encodeChatMessage({
            from,
            target,
            msgType: type,
            msg: content,
            uuid,
        })

        connectionState.connection
            ?.sendMessage({
                body: chatMessageData,
                uuid,
            })
            .then(() => {
                message.state = 'success'
            })
            .catch(() => {
                message.state = 'failure'
            })
    }

    /** 返回一个回调函数，该回调函数处理每次上传进度更新 */
    private updateProgress(message: DisplayMessage) {
        return (p: number, checkpoint: Checkpoint) => {
            // 被用户手动终止上传的消息不更新进度
            if (message.state !== 'pending') return
            // 获取最新的上传百分比和最新的碎片信息
            message.uploadProgress = {
                percentage: p * 100,
                checkpoint,
            }
        }
    }

    /** 发送 `收款方式` 时调用，从而告知 OTC 后台，改变 App 端相应按钮状态 */
    showPay() {
        let url = baseUrl + `/backend/order/show-pay-chat?order_num=${orderid}`
        url += `&timestamp=${Date.now()}`
        axios({
            url,
            method: `get`,
            headers: { Authorization: token },
        })
    }
}

export const messageStore = new MessageStore()
