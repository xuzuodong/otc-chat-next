
<template>
    <!-- style="flex-basis: 0px" 是为了兼容 iOS 和 macOS 下的 Safari 浏览器，如果没有这个样式，整个聊天列表无法显示 -->
    <q-scroll-area ref="scrollArea" class="flex-grow" style="flex-basis: 0px" :visible="false">
        <q-pull-to-refresh @refresh="loadMore" class="h-full w-full absolute">
            <ChatContentMessageVue
                v-for="message in messages"
                :key="message.uuid"
                :id="message.uuid"
                :content="message.content"
                :fromMyself="myid == message.from"
                :time="formatDate(message.datetime, 'MM月DD日 HH:mm')"
                :uuid="message.uuid"
                :type="message.type"
                :state="message.state"
                :hideDatetime="message.hideDatetime"
                :uploadProgress="message.uploadProgress"
            />
        </q-pull-to-refresh>
    </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent, nextTick, watch, watchEffect } from 'vue'
import { from } from '@/store/appCallerStore'
import { connectionState } from '@/store/connectionStore'
import { DisplayMessage, messageStore } from '@/store/messagesStore'
import useScrollTo from '@/composables/useScrollTo'
import ChatContentMessageVue from './ChatContentMessage.vue'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import decodeChatMessage from '@/utils/fzm-message-protocol-chat/decodeChatMessage'
import { date } from 'quasar'

export default defineComponent({
    components: { ChatContentMessageVue },
    setup() {
        const messages = messageStore.messages
        const myid = from
        const formatDate = date.formatDate

        // 监听「下拉加载更多」操作，记录当前的第一条消息 id
        let firstMessageSnapshot: DisplayMessage
        const loadMore = (done?: () => void) => {
            firstMessageSnapshot = messages[0]
            retrieveMessages().then(() => done && done())
        }

        const retrieveMessages = (): Promise<void> => {
            return new Promise((resolve) => {
                messageStore.retrieveMessages().then(() => resolve())
            })
        }
        retrieveMessages()

        // 接收消息，把消息存入 messageStore 并显示
        watchEffect((): void => {
            if (connectionState.connection) {
                // 收到消息，解码并存入 `messageStore`
                connectionState.connection.onReceiveMessage = (msgData) => {
                    const msg = decodeChatMessage(msgData)

                    messageStore.displayNewMessage({
                        content: msg.content,
                        from: msg.from,
                        uuid: msg.uuid,
                        state: null,
                        type: (msg.type || 0) as ChatMessageTypes,
                        datetime: msg.datetime,
                        logid: msg.logid,
                    })
                }

                // 断连，修改相应连接状态
                connectionState.connection.onLoseConnection = () => {
                    connectionState.connection = undefined
                    connectionState.error = true
                }
            }
        })

        // 收到新消息时滚动至底部
        const { scrollToBottom, scrollArea, scrollToElement } = useScrollTo()
        watch(messages, () => {
            nextTick(() => {
                if (messageStore.appendingNewMessage.value) {
                    scrollToBottom()
                } else {
                    scrollToElement(document.getElementById(firstMessageSnapshot.uuid))
                }
            })
        })

        return { scrollToBottom, scrollArea, messages, myid, formatDate, loadMore }
    },
})
</script>
