
<template>
    <!-- style="flex-basis: 0px" 是为了兼容 iOS 和 macOS 下的 Safari 浏览器，如果没有这个样式，整个聊天列表无法显示 -->
    <q-scroll-area ref="scrollArea" class="flex-grow" style="flex-basis: 0px" :visible="false">
        <ChatContentMessageVue
            v-for="message in messageStore.messages"
            :key="message.uuid"
            v-model="message.state"
            :message="message.content"
            :fromMyself="myToken == message.from"
            :time="'4月20号 12:46'"
            :uuid="message.uuid"
            :type="message.type"
        />

        <!-- 监听视图高度变化，保证高度变化时，滚动到最底部 -->
        <q-resize-observer @resize="scrollToBottom" />
    </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import ChatContentMessageVue from './ChatContentMessage.vue'
import useScrollToBottom from '@/composables/useScrollToBottom'
import { useRoute } from 'vue-router'
import { messageStore } from '@/store/messagesState'

export default defineComponent({
    components: { ChatContentMessageVue },
    setup() {
        const route = useRoute()
        const myToken = route.query.token

        const { scrollToBottom, scrollArea } = useScrollToBottom()
        onMounted(scrollToBottom)

        return { scrollToBottom, scrollArea, messageStore, myToken }
    },
})
</script>
