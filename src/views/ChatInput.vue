<template>
    <div class="flex justify-between items-center min-h-input-bar bg-white">
        <div @click="inputType === 1 ? (inputType = 2) : (inputType = 1)" class="w-7 h-7 mx-2.5 text-center">
            <i v-if="inputType === 1" class="iconfont text-primary text-xl">&#xe604;</i>
            <i v-else class="iconfont text-primary text-xl">&#xe60d;</i>
        </div>

        <ChatInputTextVue v-if="inputType === 1" @send="sendChatMessage" />
        <ChatInputVoiceVue v-else />

        <div class="w-7 h-7 mx-2.5 text-center">
            <i class="iconfont text-primary text-xl">&#xe605;</i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import { messageStore } from '@/store/messagesStore'
import { MessageContent } from '@/types/chat-message'
import ChatInputTextVue from './ChatInputText.vue'
import ChatInputVoiceVue from './ChatInputVoice.vue'

export default defineComponent({
    components: { ChatInputTextVue, ChatInputVoiceVue },

    setup() {
        const enum InputType {
            text = 1,
            voice,
        }

        /** 输入框类型，文本 or 语音 */
        const inputType = ref(InputType.text)

        /** 发送消息 */
        const sendChatMessage = (payload: { type: ChatMessageTypes; content: MessageContent }) => {
            messageStore.sendMessage(payload.type, payload.content)
        }

        return {
            inputType,
            sendChatMessage,
            ChatInputTextVue,
            ChatInputVoiceVue,
        }
    },
})
</script>
