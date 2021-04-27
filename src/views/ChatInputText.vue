<template>
    <textarea
        ref="textarea"
        @keydown.enter.prevent="sendTextMessage"
        class="flex-grow border-none outline-none py-2.5 h-9"
        v-model="inputText"
        style="max-height: 6em"
        type="text"
        placeholder="想说点什么呢..."
        :input-class="['text-base']"
    />
</template>

<script lang='ts'>
import { MessageContent } from '@/types/chat-message'
import { ref } from '@vue/reactivity'
import { defineComponent, onMounted } from '@vue/runtime-core'
import autosize from 'autosize'

export default defineComponent({
    emits: ['send'],

    setup(props, { emit }) {
        /** 文本输入框中的实时内容 */
        const inputText = ref('')

        /** 告诉父组件要发送一条文本消息 */
        const sendTextMessage = () => {
            const textMessageContent: MessageContent = { content: inputText.value }
            inputText.value && emit('send', { type: 1, content: textMessageContent })
            inputText.value = ''
        }

        /** 限定 textarea 的最大长度 */
        const textarea = ref<HTMLTextAreaElement | null>(null)
        onMounted(() => textarea.value && autosize(textarea.value))

        return { inputText, sendTextMessage, textarea }
    },
})
</script>