<template>
    <!-- input bar -->
    <div class="flex justify-between items-center min-h-input-bar bg-white">
        <div
            @click="inputType === 1 ? (inputType = 2) : (inputType = 1)"
            class="w-7 h-7 mx-2.5 text-center select-none"
        >
            <i v-if="inputType === 1" class="iconfont text-primary text-xl">&#xe604;</i>
            <i v-else class="iconfont text-primary text-xl">&#xe60d;</i>
        </div>

        <ChatInputTextVue v-if="inputType === 1" @send="sendChatMessage" @focus="showMenu = false" />
        <ChatInputVoiceVue v-else-if="inputType === 2" />

        <div @click="showMenu ? (showMenu = false) : (showMenu = true)" class="w-7 h-7 mx-2.5 text-center select-none">
            <i class="iconfont text-primary text-xl">&#xe605;</i>
        </div>
    </div>

    <!-- input menu -->
    <div v-show="showMenu" class="min-h-input-menu flex items-center px-8 text-sm text-subtle">
        <ChatInputAlbumVue />
        <ChatInputCameraVue />
        <ChatInputReceiveVue />
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
import ChatInputCameraVue from './ChatInputCamera.vue'
import ChatInputReceiveVue from './ChatInputReceipt.vue'

export default defineComponent({
    components: { ChatInputTextVue, ChatInputVoiceVue, ChatInputAlbumVue, ChatInputCameraVue, ChatInputReceiveVue },

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

        return {
            inputType,
            showMenu,
            sendChatMessage,
        }
    },
})
</script>
