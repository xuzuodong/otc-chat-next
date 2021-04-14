<template>
    <q-input
        @keydown.enter.prevent="sendTextMessage"
        borderless
        class="flex-grow"
        v-model="inputText"
        type="text"
        placeholder="想说点什么呢..."
        :input-class="['text-base']"
        autogrow
        input-style="max-height: 6em"
    />
</template>

<script lang='ts'>
import { MessageContent } from '@/types/chat-message'
import { ref } from '@vue/reactivity'
import { defineComponent } from '@vue/runtime-core'
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

        return { inputText, sendTextMessage }
    },
})
</script>