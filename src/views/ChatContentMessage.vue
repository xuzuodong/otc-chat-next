<template>
    <div>
        <div v-if="!hideDatetime" class="text-xs text-gray-400 text-center pb-2 pt-4">{{ time }}</div>
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
                <!-- 文本消息 -->
                <ChatContentMessageTextVue v-if="type === 1" :from-myself="fromMyself" :content="content" />

                <!-- 语音消息 -->
                <ChatContentMessageVoiceVue
                    v-else-if="type === 2"
                    :from-myself="fromMyself"
                    :content="content"
                    :state="state"
                />

                <!-- 图片消息 -->
                <ChatContentMessageImageVue
                    v-else-if="type === 3"
                    :from-myself="fromMyself"
                    :state="state"
                    :content="content"
                    :uploadProgress="uploadProgress"
                />

                <ChatContentMessageVideoVue
                    v-else-if="type === 4"
                    :from-myself="fromMyself"
                    :state="state"
                    :content="content"
                    :uploadProgress="uploadProgress"
                />

                <!-- 卡片消息 -->
                <ChatContentMessageCardVue v-else-if="type === 6" :from-myself="fromMyself" :content="content" />

                <!-- 消息状态 -->
                <div class="w-10 self-stretch flex flex-row justify-center items-center">
                    <!-- 发送失败 -->
                    <div
                        v-if="state === 'failure'"
                        @click="resend"
                        class="w-full h-full flex flex-row justify-center items-center"
                    >
                        <q-icon name="error" size="22px" color="negative" />
                    </div>
                    <!-- 正在发送 -->
                    <q-spinner-ios
                        v-else-if="state === 'pending' && !isMedia"
                        color="grey"
                        size="1.25rem"
                        :thickness="5"
                    />
                    <q-icon
                        v-else-if="state === 'pending' && isMedia"
                        @click="abort"
                        name="cancel"
                        size="22px"
                        color="negative"
                    />
                </div>
            </div>

            <!-- 空白元素占位 -->
            <div :class="type === 6 ? 'min-w-chat-msg-card-placeholder' : 'min-w-chat-msg-placeholder'"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import default_avatar_url from '../assets/user_avatar.png'
import { messageStore } from '@/store/messagesStore'
import ChatContentMessageTextVue from './ChatContentMessageText.vue'
import ChatContentMessageVoiceVue from './ChatContentMessageVoice.vue'
import ChatContentMessageCardVue from './ChatContentMessageCard.vue'
import ChatContentMessageImageVue from './ChatContentMessageImage.vue'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import ChatContentMessageVideoVue from './ChatContentMessageVideo.vue'

export default defineComponent({
    components: {
        ChatContentMessageTextVue,
        ChatContentMessageVoiceVue,
        ChatContentMessageCardVue,
        ChatContentMessageImageVue,
        ChatContentMessageVideoVue,
    },

    props: {
        fromMyself: Boolean,
        content: { type: Object, required: true },
        type: { type: Number, required: true },
        time: String,
        state: String,
        uuid: { type: String, required: true },
        hideDatetime: Boolean,
        uploadProgress: Object,
    },

    setup(props) {
        /** 重发消息 */
        const resend = () => {
            messageStore.sendMessage(props.type, props.content, props.uuid)
        }

        const abort = () => {
            messageStore.abortSendingMessage(props.uuid, props.uploadProgress?.checkpoint)
        }

        const isMedia = computed(() => {
            return props.type === ChatMessageTypes.Image || props.type === ChatMessageTypes.Video
        })

        return { default_avatar_url, resend, isMedia, abort }
    },
})
</script>