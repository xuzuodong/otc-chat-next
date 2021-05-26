<template>
    <div class="flex flex-col flex-nowrap h-full text-base bg-gray-50">
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
            class="flex flex-col justify-center items-center bg-gray-50 h-full w-full px-5"
        >
            <div>初始化聊天失败</div>
            <div v-if="debug" class="w-full">
                <div>from: {{ from }}</div>
                <div>token: {{ token }}</div>
                <div>orderid: {{ orderid }}</div>
                <div class="break-all">url: {{ url }}</div>
            </div>
        </div>
        <div
            v-else-if="connectionState.error"
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
import { getOrderInfo } from '@/store/appCallerStore'
import { token, from, orderid } from '@/store/appCallerStore'
import computeExt from '@/utils/getFzmMesageProtocolExt'

export default defineComponent({
    components: { ChatHeaderVue, ChatContentVue, ChatInputVue },

    setup() {
        const initError = ref(false)
        const debug = process.env.NODE_ENV === 'development'

        const connect = async () => {
            connectionState.error = false
            initError.value = false

            const wsUrl = location.origin.replace('http://', 'ws://').replace('https://', 'wss://') + '/sub/'
            const fmp = new FzmMessageProtocol(wsUrl)

            getOrderInfo()
                .then((res) => {
                    return fmp.authorize({
                        appId: 'zb_otc',
                        token,
                        ext: computeExt(res.value),
                    })
                })
                .then((conn) => {
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

        return {
            connectionState,
            connect,
            initError,
            debug,
            from,
            token,
            orderid,
            url: window.location.href,
        }
    },
})
</script>
