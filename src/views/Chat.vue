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
import { defineComponent, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import FzmMessageProtocol from '@/utils/fzm-message-protocol'
import { connectionState } from '@/store/connectionState'
import ChatContentVue from './ChatContent.vue'
import ChatInputVue from './ChatInput.vue'
import ChatHeaderVue from './ChatHeader.vue'

export default defineComponent({
    components: { ChatHeaderVue, ChatContentVue, ChatInputVue },

    setup() {
        const route = useRoute()

        const connect = () => {
            connectionState.error = false
            
            const fmp = new FzmMessageProtocol('ws://172.16.101.126:8888/sub/')
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

        onBeforeUnmount(() => {
            connectionState.connection?.disconnect()
        })

        return { connectionState, connect }
    },
})
</script>
