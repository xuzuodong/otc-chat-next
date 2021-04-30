<template>
    <!-- input bar -->
    <div class="flex justify-between items-center min-h-input-bar bg-white">
        <!-- 发送语音入口暂时禁用，因为发送语音功能在手机端的浏览器兼容性很差 -->
        <div
            @click="inputType === 1 ? (inputType = 2) : (inputType = 1)"
            class="w-7 h-7 mx-2.5 text-center select-none"
        >
            <i v-if="inputType === 1" class="iconfont text-primary text-xl">&#xe604;</i>
            <i v-else class="iconfont text-primary text-xl">&#xe60d;</i>
        </div>

        <ChatInputTextVue v-if="inputType === 1" @send="sendChatMessage" @click="showMenu = false" />
        <ChatInputVoiceVue v-else-if="inputType === 2" />

        <div @click="showMenu ? (showMenu = false) : (showMenu = true)" class="w-7 h-7 mx-2.5 text-center select-none">
            <i class="iconfont text-primary text-xl">&#xe605;</i>
        </div>
    </div>

    <!-- input menu -->
    <div v-show="showMenu" class="min-h-input-menu flex items-center px-8 text-sm text-subtle">
        <ChatInputAlbumVue />
        <!-- <ChatInputCameraVue /> -->
        <ChatInputReceiptVue v-if="showReceiptInput" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import { messageStore } from '@/store/messagesStore'
import { MessageContent } from '@/types/chat-message'
import ChatInputTextVue from './ChatInputText.vue'
import ChatInputVoiceVue from './ChatInputVoice.vue'
import ChatInputAlbumVue from './ChatInputAlbum.vue'
// import ChatInputCameraVue from './ChatInputCamera.vue'
import ChatInputReceiptVue from './ChatInputReceipt.vue'
import { getOrderInfo } from '@/store/appCallerStore'
import { from } from '@/store/appCallerStore'

export default defineComponent({
    components: {
        ChatInputTextVue,
        ChatInputVoiceVue,
        ChatInputAlbumVue,
        // ChatInputCameraVue,
        ChatInputReceiptVue,
    },

    setup() {
        const enum InputType {
            text = 1,
            voice,
        }

        /** 输入框类型，文本 or 语音 */
        const inputType = ref(InputType.text)

        /** 菜单是否弹出 */
        const showMenu = ref(false)

        /** 发送消息 */
        const sendChatMessage = (payload: { type: ChatMessageTypes; content: MessageContent }) => {
            messageStore.sendMessage(payload.type, payload.content)
        }

        // 币的出售方才可以发送自己的「收款方式」给对方；
        // 出售方可能是承兑商，也可能是普通用户；
        // 如果用户找承兑商买币，那么承兑商的界面上显示「收款方式」按钮，
        // 如果用户找承兑商卖币，那么用户的界面上显示「收款方式」按钮。
        const showReceiptInput = ref(false)
        getOrderInfo().then((orderInfo) => {
            // 当前用户是承兑商还是普通用户
            const isUserMerchant = orderInfo.merchantId === from

            const merchantShowInputCase = isUserMerchant && orderInfo.type == 2
            const userShowInputCase = !isUserMerchant && orderInfo.type == 1

            if (merchantShowInputCase || userShowInputCase) {
                showReceiptInput.value = true
            }
        })

        return {
            inputType,
            showMenu,
            sendChatMessage,
            showReceiptInput,
        }
    },
})
</script>
