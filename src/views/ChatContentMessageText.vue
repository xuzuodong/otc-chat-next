<template>
    <div
        :class="[
            fromMyself ? 'bg-secondary' : 'bg-white',
            fromMyself ? 'rounded-chat-msg-bubble-myself' : 'rounded-chat-msg-bubble-opposite',
        ]"
        class="py-3 px-4 max-w-chat-msg-text break-all"
    >
        <a
            v-if="isUrlMessage"
            :href="prependHttp(textMessage)"
            class="text-primary enable-touch"
            target="_blank"
            rel="noopener noreferrer"
        >
            {{ textMessage }}
        </a>
        <div v-else class="enable-touch">{{ textMessage }}</div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import isUrl from '@/utils/is-url'
import prependHttp from 'prepend-http'

export default defineComponent({
    props: { fromMyself: Boolean, content: Object },

    setup(props) {
        const textMessage = computed(() => props.content?.content)
        const isUrlMessage = computed(() => isUrl(textMessage.value))

        return { isUrlMessage, prependHttp, textMessage }
    },
})
</script>

<style scoped></style>
