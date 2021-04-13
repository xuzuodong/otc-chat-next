<template>
    <div v-if="time" class="text-xs text-gray-400 text-center pb-2 pt-4">{{ time }}</div>
    <div
        class="flex justify-between items-start flex-nowrap w-screen py-1.5"
        :class="{ 'flex-row-reverse': fromMyself }"
    >
        <!-- 头像  -->
        <q-avatar class="mx-4 min-w-chat-msg-avatar w-chat-msg-avatar h-chat-msg-avatar rounded-lg">
            <img :src="default_avatar_url" />
        </q-avatar>

        <!-- 消息气泡 -->
        <div :class="[{ 'flex-row-reverse': fromMyself }]" class="flex-auto flex items-center">
            <div
                :class="[
                    fromMyself ? 'bg-secondary' : 'bg-white',
                    fromMyself ? 'rounded-chat-msg-bubble-myself' : 'rounded-chat-msg-bubble-opposite',
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
            <!-- 消息状态 -->
            <div class="w-10 self-stretch flex flex-row justify-center items-center">
                <!-- 发送失败 -->
                <div
                    v-if="modelValue === 'failure'"
                    @click="resend"
                    class="w-full h-full flex flex-row justify-center items-center"
                >
                    <q-icon name="error" size="22px" color="negative" />
                </div>
                <!-- 正在发送 -->
                <q-spinner-ios v-else-if="modelValue === 'pending'" color="grey" size="1.25rem" :thickness="5" />
            </div>
        </div>

        <!-- placeholder -->
        <div class="min-w-chat-msg-placeholder"></div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import isUrl from '../utils/is-url'
import prependHttp from 'prepend-http'
import default_avatar_url from '../assets/user_avatar.png'
import { connectionState } from '@/store/connectionState'
import encodeChatMessage from '@/utils/fzm-message-protocol-chat/encodeChatMessage'
import { ChatMessageTypes } from '@/utils/fzm-message-protocol-chat/chatMessageTypes'
import { useRoute } from 'vue-router'

enum InputType {
    Text,
    Voice,
}

export default defineComponent({
    props: {
        fromMyself: Boolean,
        message: { type: String, required: true },
        type: { type: Number, required: true },
        time: String,
        modelValue: String,
        uuid: String,
    },

    emits: ['update:modelValue'], // 双向绑定重发消息成功/失败

    setup(props, { emit }) {
        const isUrlMessage = computed(() => isUrl(props.message))
        const inputType = InputType.Text
        const route = useRoute()
        const resend = (uuid: string) => {
            connectionState.connection
                ?.sendMessage({
                    body: encodeChatMessage({
                        msgType: ChatMessageTypes.Text,
                        target: (route.query.token as string) ? '1' : '2',
                        from: (route.query.token as string) || '1',
                        msg: props.message as string,
                        uuid,
                    }),
                    uuid,
                })
                .then(() => {
                    emit('update:modelValue', 'success')
                })
                .catch(() => {
                    emit('update:modelValue', 'failure')
                })
        }

        return { isUrlMessage, prependHttp, default_avatar_url, inputType, resend }
    },
})
</script>