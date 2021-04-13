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
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { connectionState } from '@/store/connectionState'
import encodeChatMessage from '@/utils/fzm-message-protocol-chat/encodeChatMessage'
import { ChatMessageTypes } from '@/utils/fzm-message-protocol-chat/chatMessageTypes'
import { messageStore } from '@/store/messagesState'
import { useRoute } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import { ChatMessage } from '@/types/chat-message'
import ChatInputTextVue from './ChatInputText.vue'
import ChatInputVoiceVue from './ChatInputVoice.vue'

export default defineComponent({
    components: { ChatInputTextVue, ChatInputVoiceVue },

    setup() {
        const route = useRoute()

        const enum InputType {
            text = 1,
            voice,
        }

        /** 输入框类型，文本 or 语音 */
        const inputType = ref(InputType.text)

        onMounted(() => {
            console.log('userid:' + (route.query.token || '1'))
            console.log('targetid: ' + ((route.query.token as string) ? '1' : '2'))
        })

        /** 发送消息 */
        const sendChatMessage = (payload: { type: ChatMessageTypes; content: string }) => {
            const uuid = uuidv4()

            // 发送
            const messageContentData = encodeChatMessage({
                msgType: ChatMessageTypes.Text,
                target: (route.query.token as string) ? '1' : '2',
                from: (route.query.token as string) || '1',
                msg: payload.content,
                uuid: uuid,
            })
            connectionState.connection
                ?.sendMessage({ body: messageContentData, uuid })
                .then(() => {
                    chatMessage.state = 'success'
                })
                .catch(() => {
                    chatMessage.state = 'failure'
                })

            // 存入本地状态
            const chatMessage: ChatMessage = reactive({
                content: payload.content,
                from: route.query.token as string,
                uuid: uuid,
                state: 'pending',
                type: ChatMessageTypes.Text,
            })
            messageStore.pushMessage(chatMessage)
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
