
<template>
    <!-- style="flex-basis: 0px" 是为了兼容 iOS 和 macOS 下的 Safari 浏览器，如果没有这个样式，整个聊天列表无法显示 -->
    <q-scroll-area ref="scrollArea" class="flex-grow" style="flex-basis: 0px" :visible="false">
        <ChatContentMessageVue
            v-for="message in messages"
            :key="message.uuid"
            :content="message.content"
            :fromMyself="myToken == message.from"
            :time="'4月20号 12:46'"
            :uuid="message.uuid"
            :type="message.type"
            :state="message.state"
        />

        <!-- 监听视图高度变化，保证高度变化时，滚动到最底部 -->
        <q-resize-observer @resize="scrollToBottom" />
    </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent, onMounted, watchEffect, reactive } from 'vue'
import { from } from '@/store/userStore'
import { connectionState } from '@/store/connectionStore'
import { messageStore } from '@/store/messagesStore'
import useScrollToBottom from '@/composables/useScrollToBottom'
import ChatContentMessageVue from './ChatContentMessage.vue'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import decodeChatMessage from '@/utils/fzm-message-protocol-chat/decodeChatMessage'

export default defineComponent({
    components: { ChatContentMessageVue },
    setup() {
        const myToken = from

        const messages = messageStore.messages
    
        const { scrollToBottom, scrollArea } = useScrollToBottom()
        onMounted(scrollToBottom)

        /**
         * 接收消息，把消息存入 messageStore 并显示
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

        return { scrollToBottom, scrollArea, messages, myToken, reactive }
    },
})
</script>
