<template>
    <div
        @click="togglePlay"
        :class="[
            fromMyself ? 'bg-secondary' : 'bg-white',
            fromMyself ? 'rounded-chat-msg-bubble-myself' : 'rounded-chat-msg-bubble-opposite',
            { 'flex-row-reverse': !fromMyself },
        ]"
        class="py-3 px-4 flex"
    >
        <div
            class="mx-0.5"
            :style="{ width: audioBarWidth || '0' }"
            :class="{ 'text-right': fromMyself, 'opacity-0': state === 'pending' }"
        >
            {{ time }}s
        </div>

        <ChatContentMessageVoiceWaveVue
            :fromMyself="fromMyself"
            :isPlaying="isPlaying"
            :class="{ 'opacity-0': state === 'pending' }"
            class="mx-0.5"
        />
    </div>

    <div v-if="showUnreadMark" class="w-1.5 h-1.5 rounded-full mt-1.5 ml-1 self-start bg-red-500"></div>

    <teleport to="body">
        <audio ref="audio" :src="mediaUrl || '1'"></audio>
    </teleport>
</template>

<script lang="ts">
import { dtalk } from '@/utils/fzm-message-protocol-chat/protobuf'
import { computed, defineComponent, onMounted, ref, toRefs } from 'vue'
import ChatContentMessageVoiceWaveVue from './ChatContentMessageVoiceWave.vue'

export default defineComponent({
    components: { ChatContentMessageVoiceWaveVue },

    props: { fromMyself: Boolean, content: Object, state: String },

    setup(props) {
        /** 正在播放 */
        const isPlaying = ref(false)

        /** 未读标记 */
        const showUnreadMark = ref(props.state === null && !props.fromMyself)

        /** `<audio>` HTML 元素 */
        const audio = ref<null | HTMLAudioElement>(null)

        /** 语音 url, 语音时长 */
        const { mediaUrl, time } = toRefs(props.content as dtalk.proto.IAudioMsg)

        /** 语音条长度 */
        const audioBarWidth = computed(() => {
            // 1 秒时 width 为 0 vw, 11 秒时 width 为 35 vw
            return time?.value && ((time.value - 1) / 10) * 35 + 'vw'
        })

        onMounted(() => {
            if (audio.value && mediaUrl?.value) audio.value.load()
            audio.value && audio.value.addEventListener('pause', () => (isPlaying.value = false))
            audio.value && audio.value.addEventListener('ended', () => (isPlaying.value = false))
        })

        const togglePlay = () => {
            // 正在播放的，停止
            if (isPlaying.value) {
                if (mediaUrl?.value) {
                    isPlaying.value = false
                    audio.value && audio.value.load()
                    audio.value && audio.value.pause()
                }
            }
            // 停止的，播放
            else {
                isPlaying.value = true
                audio.value && audio.value.play()
            }

            showUnreadMark.value && (showUnreadMark.value = false)
        }

        return { isPlaying, showUnreadMark, mediaUrl, time, audioBarWidth, togglePlay, audio }
    },
})
</script>
