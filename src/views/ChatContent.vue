
<template>
    <!-- style="flex-basis: 0px" 是为了兼容 iOS 和 macOS 下的 Safari 浏览器，如果没有这个样式，整个聊天列表无法显示 -->
    <q-scroll-area ref="scrollArea" class="flex-grow" style="flex-basis: 0px">
        <ChatContentMessageVue
            :message="'为了大家资金安全着想，需要提供银行卡流水明细，录屏审核（当天有转入的资金不交易）'"
            :opposite="true"
            :time="'4月20号 12:46'"
        />
        <ChatContentMessageVue :message="'钱已经付，请马上放币！'" />
        <ChatContentMessageVue :message="'www.chongya.fun'" />

        <!-- 监听俯视图高度变化，保证高度变化时，滚动到最底部 -->
        <q-resize-observer @resize="scrollToBottom" />
    </q-scroll-area>
</template>

<script lang="ts">
import { QScrollArea } from 'quasar'
import { defineComponent, ref, onMounted } from 'vue'
import ChatContentMessageVue from './ChatContentMessage.vue'

export default defineComponent({
    components: { ChatContentMessageVue },

    setup() {
        const scrollArea = ref<QScrollArea | null>(null)

        const scrollToBottom = () => {
            if (scrollArea.value) {
                // 滚动至最底部
                const scrollTarget = scrollArea.value.getScrollTarget()
                scrollArea.value.setScrollPosition('vertical', scrollTarget.scrollHeight)
            }
        }

        onMounted(scrollToBottom)

        return { scrollArea, scrollToBottom }
    },
})
</script>
