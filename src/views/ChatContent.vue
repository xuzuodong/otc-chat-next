<template>
    <!-- style="flex-basis: 0px" 是为了兼容 iOS 和 macOS 下的 Safari 浏览器，如果没有这个样式，整个聊天列表无法显示 -->
    <q-scroll-area ref="scrollArea" class="flex-grow" style="flex-basis: 0px" :visible="false">
        <q-pull-to-refresh
            @refresh="loadMore"
            :disable="noMoreMessages || messages.length === 0"
            icon="history"
            class="h-full w-full absolute"
        >
            <div class="text-center py-2.5 text-xs font-medium text-subtle">
                <div v-if="noMoreMessages && messages.length > 0">没有更多消息</div>
                <div v-else-if="messages.length > 0">
                    {{ isMobile ? '下滑加载更多' : '按住鼠标向下拖拽以加载更多' }}
                </div>
            </div>
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
import { defineComponent, nextTick, watch } from 'vue'
import { from } from '@/store/appCallerStore'
import { DisplayMessage, messageStore } from '@/store/messagesStore'
import useScrollTo from '@/composables/useScrollTo'
import ChatContentMessageVue from './ChatContentMessage.vue'
import { date, Platform } from 'quasar'

export default defineComponent({
    components: { ChatContentMessageVue },
    setup() {
        const messages = messageStore.messages
        const noMoreMessages = messageStore.noMoreHistoryMessages
        const myid = from
        const formatDate = date.formatDate
        const isMobile = Platform.is.mobile

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

        return { scrollToBottom, scrollArea, messages, noMoreMessages, isMobile, myid, formatDate, loadMore }
    },
})
</script>
