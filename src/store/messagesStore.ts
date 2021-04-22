/**
 * 全局消息管理
 */

import { MessageContent } from '@/types/chat-message'
import { reactive, UnwrapNestedRefs } from '@vue/reactivity'
import { from, target } from '@/store/appCallerStore'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import encodeChatMessage from '@/utils/fzm-message-protocol-chat/encodeChatMessage'
import { v4 as uuidv4 } from 'uuid'
import { connectionState } from './connectionStore'
import { uploadFile, abortUploadFile } from './ossStore'
import { dtalk } from '@/utils/fzm-message-protocol-chat/protobuf'
import { date } from 'quasar'
import { Checkpoint } from 'ali-oss'

/** MessageStore 存储的数据结构 */
interface DisplayMessage {
    /** 消息内容，不同的消息类型有不同的结构 */
    content: MessageContent | UnwrapNestedRefs<MessageContent>
    /** 我的 id */
    from: string
    /** 本条消息的 uuid */
    uuid: string
    /** 显示在用户界面上的消息发送状态，对方发来的消息无状态，用 null 表示 */
    state: 'pending' | 'success' | 'failure' | null
    /** 多媒体消息的上传进度, 值为 0 ~ 1 */
    uploadProgress?: {
        percentage: number
        checkpoint?: Checkpoint
    }
    /** 消息类型 */
    type: ChatMessageTypes
    /** 消息发送时间 */
    datetime: number
    /** 是否隐藏消息时间 */
    hideDatetime?: boolean
}

class MessageStore {
    messages: UnwrapNestedRefs<DisplayMessage[]>

    constructor() {
        this.messages = reactive<DisplayMessage[]>([])
    }

    pushMessage(message: DisplayMessage) {
        // 和上条消息发送间隔小于 2 分钟的隐藏显示时间
        if (this.messages.length) {
            const lastMsg = this.messages[this.messages.length - 1]
            const hideDate = date.getDateDiff(message.datetime, lastMsg.datetime, 'seconds') < 120
            message.hideDatetime = hideDate
        }
        this.messages.push(message)
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
        let displayMessage: UnwrapNestedRefs<DisplayMessage>

        /** 之前发送失败的消息 */
        const existingMessage = uuid && this.messages.find((m) => m.uuid === _uuid)

        // 如果是老消息，找出来赋给 displayMessage
        if (existingMessage) {
            existingMessage.state = 'pending'
            displayMessage = existingMessage
        }
        // 如果是新消息，新建一个 displayMessage
        else {
            displayMessage = reactive<DisplayMessage>({
                content,
                from,
                uuid: _uuid,
                state: 'pending' as 'pending' | 'success' | 'failure' | null,
                type,
                datetime: Date.now(),
                uploadProgress: { percentage: 0 },
            })
            this.pushMessage(displayMessage)
        }

        // 多媒体类的消息（语音、图片、视频）上传阿里云 OSS，取得 url，发送 url
        if (type !== ChatMessageTypes.Text && type !== ChatMessageTypes.Card) {
            // 特殊情况处理：当发送微信和支付宝收款方式时，由于是直接从后端拿到的图片外链，所以直接发送
            if (!content.rawMessage) {
                if (type === ChatMessageTypes.Image && (<dtalk.proto.IAudioMsg>content).mediaUrl) {
                    this.send(type, content, _uuid, displayMessage)
                }
                return
            }

            uploadFile(content.rawMessage, type, this.getOnprogressCallback(displayMessage))
                .then((url) => {
                    // 如果用户提前终止了本次上传，则直接 return
                    if (displayMessage.state === 'failure') return

                    console.log(`阿里云 OSS 上传成功, ${url}`)

                    if (type === ChatMessageTypes.Audio) {
                        ;(<dtalk.proto.IAudioMsg>content).mediaUrl = url
                    } else if (type === ChatMessageTypes.Image) {
                        ;(<dtalk.proto.IImageMsg>content).mediaUrl = url
                    }
                    this.send(type, content, _uuid, displayMessage)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        // 文本类消息，不需要上传 OSS，直接发送
        else {
            this.send(type, content, _uuid, displayMessage)
        }
    }

    /**
     * 用户主动终止上传
     * @param uuid 终止的消息 id
     * @param checkpoint 分片片段
     */
    abortSendingMessage(uuid: string, checkpoint: Checkpoint) {
        abortUploadFile(checkpoint)
        const theMessage = this.messages.find((m) => m.uuid == uuid)
        if (theMessage) {
            theMessage.state = 'failure'
            theMessage.uploadProgress = undefined
        }
    }

    /** 编码并发送 */
    private send(type: ChatMessageTypes, content: MessageContent, uuid: string, displayMessage: DisplayMessage) {
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
                displayMessage.state = 'success'
            })
            .catch(() => {
                displayMessage.state = 'failure'
            })
    }

    /** 返回一个回调函数，该回调函数在每次上传文件的进度更新时执行 */
    private getOnprogressCallback(displayMessage: DisplayMessage) {
        return (p: number, checkpoint: Checkpoint) => {
            if (displayMessage.state === 'pending') {
                displayMessage.uploadProgress = {
                    percentage: p * 100,
                    checkpoint,
                }
            }
        }
    }
}

export const messageStore = new MessageStore()
