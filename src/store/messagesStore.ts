/**
 * 全局消息管理
 */

import { MessageContent } from '@/types/chat-message'
import { Ref, ref } from '@vue/reactivity'
import { from, target } from '@/store/userStore'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import encodeChatMessage from '@/utils/fzm-message-protocol-chat/encodeChatMessage'
import { v4 as uuidv4 } from 'uuid'
import { connectionState } from './connectionStore'

interface DisplayMessage {
    content: MessageContent
    from: string
    uuid: string
    state: 'pending' | 'success' | 'failure' | null // 对方发来的消息无状态，用 null 表示
    type: ChatMessageTypes
}

class MessageStore {
    messages: Ref<DisplayMessage[]>

    constructor() {
        this.messages = ref<DisplayMessage[]>([])
    }

    pushMessage(message: DisplayMessage) {
        this.messages.value.push(message)
    }

    /**
     * 委托 connectionState 帮忙发送消息，并在界面上显示发出的消息
     * @param type 消息类型
     * @param content 消息内容，需根据类型填写对应字段
     * @param uuid 如果传入 uuid 则说明是重新发送之前失败的消息
     */
    sendMessage(type: ChatMessageTypes, content: MessageContent, uuid?: string) {
        const _uuid = uuid || uuidv4()
        /** 编码消息 */
        const chatMessageData = encodeChatMessage({
            from,
            target,
            msgType: type,
            msg: content,
            uuid: _uuid,
        })

        /** 聊天界面显示 */
        const displayMessage = {
            content,
            from,
            uuid: _uuid,
            state: 'pending' as 'pending' | 'success' | 'failure',
            type,
        }
        const existMessage = uuid && this.messages.value.find((m) => m.uuid === _uuid)
        if (existMessage) {
            existMessage.state = 'pending'
        } else {
            this.pushMessage(displayMessage)
        }

        /** 发送编码后的消息 */
        connectionState.connection
            ?.sendMessage({
                body: chatMessageData,
                uuid: _uuid,
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
