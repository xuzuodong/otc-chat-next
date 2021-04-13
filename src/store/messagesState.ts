/**
 * 全局聊天记录管理
 */

import { ChatMessage } from '@/types/chat-message'
import { reactive } from '@vue/reactivity'

export const messageStore = reactive({
    /** 所有聊天记录 */
    messages: [] as ChatMessage[],

    /** 在最后添加一条聊天记录 */
    pushMessage(message: ChatMessage) {
        this.messages.push(message)
    },
})
