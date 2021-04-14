<template>
    <div class="flex flex-col h-full text-base bg-gray-50">
        <ChatHeaderVue />

        <div
            v-if="connectionState.error"
            @click="connect"
            class="flex flex-row justify-center items-center bg-gray-50 h-full w-full"
        >
            网络错误，点击屏幕尝试重连
        </div>
        <div
            v-else-if="!connectionState.connection"
            class="flex flex-row justify-center items-center bg-gray-50 h-full w-full"
        >
            <q-spinner color="primary" size="3rem" :thickness="5" />
        </div>
        <div v-else class="flex flex-col flex-grow" style="flex-basis: 0px">
            <ChatContentVue />
            <ChatInputVue />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ChatContentVue from './ChatContent.vue'
import ChatInputVue from './ChatInput.vue'
import ChatHeaderVue from './ChatHeader.vue'
import { messageStore } from '@/store/messagesStore'
import { connectionState } from '@/store/connectionStore'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import FzmMessageProtocol from '@/utils/fzm-message-protocol'
import decodeChatMessage from '@/utils/fzm-message-protocol-chat/decodeChatMessage'
import { baseUrl } from '@/store/apiStore'

export default defineComponent({
    components: { ChatHeaderVue, ChatContentVue, ChatInputVue },

    setup() {
        const route = useRoute()

        const connect = () => {
            connectionState.error = false

            const fmp = new FzmMessageProtocol('ws://' + baseUrl)
            fmp.authorize({
                appId: 'zb_otc',
                token: (route.query.token as string) || '1',
            })
                .then((conn) => {
                    connectionState.connection = conn
                })
                .catch(() => console.error('WebSocket: 鉴权失败！'))
        }

        connect()

        /**
         * 每次 `connectionState.connection` 变化触发
         */
        watchEffect((): void => {
            if (connectionState.connection) {
                /**
                 * 收到消息，解码并存入 `messageStore`
                 */
                connectionState.connection.onReceiveMessage = (msgData) => {
                    const msg = decodeChatMessage(msgData)
                    messageStore.pushMessage({
                        content: msg.content,
                        from: msg.from,
                        uuid: msg.uuid,
                        state: null,
                        type: (msg.type || 0) as ChatMessageTypes,
                    })
                }

                /**
                 * 断连，修改相应连接状态
                 */
                connectionState.connection.onLoseConnection = () => {
                    connectionState.connection = undefined
                    connectionState.error = true
                }
            }
        })

        onBeforeUnmount(() => {
            connectionState.connection?.disconnect()
        })

        return { connectionState, connect }
    },
})
</script>
