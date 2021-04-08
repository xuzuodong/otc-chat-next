import { ChatMessage } from '@/types/chat-message'
import { reactive } from '@vue/reactivity'

export const messageStore = reactive({
    messages: [] as ChatMessage[],

    pushMessage(message: ChatMessage) {
        this.messages.push(message)
    },
})
