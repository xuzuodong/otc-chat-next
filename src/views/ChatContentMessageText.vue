<template>
    <div
        :class="[
            fromMyself ? 'bg-secondary' : 'bg-white',
            fromMyself ? 'rounded-chat-msg-bubble-myself' : 'rounded-chat-msg-bubble-opposite',
        ]"
        class="py-3 px-4"
    >
        <a
            v-if="isUrlMessage"
            :href="prependHttp(textMessage)"
            class="text-primary"
            target="_blank"
            rel="noopener noreferrer"
        >
            {{ textMessage }}
        </a>
        <div v-else>{{ textMessage }}</div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import isUrl from '@/utils/is-url'
import prependHttp from 'prepend-http'

export default defineComponent({
    props: { fromMyself: Boolean, message: Object },

    setup(props) {
        const textMessage = computed(() => props.message?.content)
        const isUrlMessage = computed(() => isUrl(textMessage.value))
        console.log(isUrl(props.message?.content))

        return { isUrlMessage, prependHttp, textMessage }
    },
})
</script>

<style scoped>
</style>