import { reactive, watchEffect } from 'vue'
import { messageStore } from '@/store/messagesState'
import decodeChatMessage from '@/utils/fzm-message-protocol-chat/decodeChatMessage'
import FzmMessageProtocolConnection from '@/utils/fzm-message-protocol/FzmMessageProtocolConnection'

interface IConnectionState {
    connection?: FzmMessageProtocolConnection
    error: boolean
}

export const connectionState = reactive<IConnectionState>({
    connection: undefined,
    error: false,
})

watchEffect((): void => {
    if (connectionState.connection) {
        connectionState.connection.onReceiveMessage = (msgData) => {
            const msg = decodeChatMessage(msgData)
            messageStore.pushMessage({
                content: msg.msg,
                from: msg.from,
                uuid: msg.uuid,
            })
        }

        connectionState.connection.onLoseConnection = () => {
            connectionState.connection = undefined
            connectionState.error = true
        }
    }
})
