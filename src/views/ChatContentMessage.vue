<template>
    <div v-if="time" class="text-xs text-gray-400 text-center pb-2 pt-4">{{ time }}</div>
    <div class="flex justify-between items-start flex-nowrap w-screen py-1.5">
        <!-- 对方头像  -->
        <q-avatar
            :class="{ invisible: !opposite }"
            class="mx-4 min-w-chat-msg-avatar w-chat-msg-avatar h-chat-msg-avatar rounded-lg"
        >
            <img :src="default_avatar_url" />
        </q-avatar>
        <!-- 消息气泡 -->
        <div :class="{ 'justify-end': !opposite }" class="flex-auto flex">
            <div
                :class="[
                    opposite ? 'bg-white' : 'bg-secondary',
                    opposite ? 'rounded-chat-msg-bubble-opposite' : 'rounded-chat-msg-bubble-me',
                ]"
                class="py-3 px-4"
            >
                <a
                    v-if="isUrlMessage"
                    :href="prependHttp(message)"
                    class="text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {{ message }}
                </a>
                <div v-else>{{ message }}</div>
            </div>
        </div>
        <!-- 我的头像 -->
        <q-avatar :class="{ invisible: opposite }" class="mx-4 w-9 min-w-9 h-9 rounded-lg"
            ><img :src="default_avatar_url"
        /></q-avatar>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import isUrl from '../utils/is-url'
import prependHttp from 'prepend-http'
import default_avatar_url from '../assets/user_avatar.png'

enum InputType {
    Text,
    Voice,
}

export default defineComponent({
    props: {
        /** 消息发出人，是否为对方，或是自己 */
        opposite: Boolean,
        message: String,
        time: String,
    },

    setup(props) {
        const isUrlMessage = computed(() => isUrl(props.message))
        const inputType = InputType.Text
        return { isUrlMessage, prependHttp, default_avatar_url, inputType }
    },
})
</script>

<style scoped>
</style>