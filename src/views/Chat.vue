<template>
    <div class="flex flex-col h-full text-base bg-gray-50">
        <ChatHeaderVue />
        <ChatContentVue />
        <ChatInputVue />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChatContentVue from './ChatContent.vue'
import ChatInputVue from './ChatInput.vue'
import ChatHeaderVue from './ChatHeader.vue'

export default defineComponent({
    components: { ChatHeaderVue, ChatContentVue, ChatInputVue },

    setup() {
        return {}
    },
})
</script>
