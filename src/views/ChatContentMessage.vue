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
            <ChatContentMessageTextVue v-if="type === 1" :from-myself="fromMyself" :message="message" />

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
import { defineComponent } from 'vue'
import default_avatar_url from '../assets/user_avatar.png'
import { messageStore } from '@/store/messagesStore'
import ChatContentMessageTextVue from './ChatContentMessageText.vue'

export default defineComponent({
    components: { ChatContentMessageTextVue },

    props: {
        fromMyself: Boolean,
        message: { type: Object, required: true },
        type: { type: Number, required: true },
        time: String,
        modelValue: String,
        uuid: String,
    },

    setup(props) {
        /** 重发消息 */
        const resend = (uuid: string) => {
            messageStore.sendMessage(props.type, props.message, uuid)
        }

        return { default_avatar_url, resend }
    },
})
</script>