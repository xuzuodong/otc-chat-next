/**
 * 全局消息管理
 */

import { MessageContent } from '@/types/chat-message'
import { reactive, UnwrapNestedRefs } from '@vue/reactivity'
import { from, target } from '@/store/userStore'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import encodeChatMessage from '@/utils/fzm-message-protocol-chat/encodeChatMessage'
import { v4 as uuidv4 } from 'uuid'
import { connectionState } from './connectionStore'
import { uploadFile } from './ossStore'
import { dtalk } from '@/utils/fzm-message-protocol-chat/protobuf'

interface DisplayMessage {
    content: MessageContent
    from: string
    uuid: string
    state: 'pending' | 'success' | 'failure' | null // 对方发来的消息无状态，用 null 表示
    type: ChatMessageTypes
}

class MessageStore {
    messages: UnwrapNestedRefs<DisplayMessage[]>

    constructor() {
        this.messages = reactive<DisplayMessage[]>([])
    }

    pushMessage(message: DisplayMessage) {
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
            })
            this.pushMessage(displayMessage)
        }

        // 多媒体类的消息（语音、图片、视频）上传阿里云 OSS，取得 url，发送 url
        if (type !== ChatMessageTypes.Text) {
            content.rawMessage &&
                uploadFile(content.rawMessage, type)
                    .then((url) => {
                        if (type === ChatMessageTypes.Audio) {
                            ;(<dtalk.proto.IAudioMsg>content).mediaUrl = url
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

    /** 编码并发送 */
    private send(type: ChatMessageTypes, content: MessageContent, uuid: string, displayMessage: DisplayMessage) {
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
}

export const messageStore = new MessageStore()
