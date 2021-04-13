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
import { ref } from '@vue/reactivity'
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
    setup(props, { emit }) {
        /** 文本输入框中的实时内容 */
        const inputText = ref('')
        
        /** 发送文本消息，由父组件统一处理 */
        const sendTextMessage = () => {
            inputText.value && emit('send', { type: 1, content: inputText.value })
            inputText.value = ''
        }
        return { inputText, sendTextMessage }
    },
})
</script>