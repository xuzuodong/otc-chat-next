<template>
    <div class="flex flex-col h-full text-base bg-gray-50">
        <!-- 没连上时界面上只有一个返回按钮 -->
        <div
            v-if="!connectionState.connection"
            @click="close"
            class="h-chat-header w-10 text-center flex justify-center items-center"
        >
            <i class="iconfont text-lg">&#xe606;</i>
        </div>
        <ChatHeaderVue v-else />

        <div
            v-if="initError"
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
import { defineComponent, onBeforeUnmount, ref } from 'vue'
import ChatContentVue from './ChatContent.vue'
import ChatInputVue from './ChatInput.vue'
import ChatHeaderVue from './ChatHeader.vue'
import { connectionState } from '@/store/connectionStore'
import FzmMessageProtocol from '@/utils/fzm-message-protocol'
import { baseUrl } from '@/store/baseUrlStore'
import { getOrderInfo } from '@/store/appCallerStore'
import { token } from '@/store/appCallerStore'

export default defineComponent({
    components: { ChatHeaderVue, ChatContentVue, ChatInputVue },

    setup() {

        const initError = ref(false)

        const connect = () => {
            connectionState.error = false
            initError.value = false

            const fmp = new FzmMessageProtocol(`ws://${baseUrl}/sub/`)
            console.log(token)

            Promise.all([
                // 连接 WebSocket
                fmp.authorize({
                    appId: 'zb_otc',
                    token,
                }),

                // 获取订单信息
                getOrderInfo(),
            ])
                .then((values) => {
                    const [conn] = values
                    connectionState.connection = conn
                })
                .catch((reason) => {
                    initError.value = true
                    console.error(reason)
                })
        }

        connect()

        onBeforeUnmount(() => {
            connectionState.connection?.disconnect()
        })

        return { connectionState, connect, initError }
    },
})
</script>
