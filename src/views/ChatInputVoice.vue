<template>
    <div
        @touchmove.prevent="cancelRecording"
        @touchstart="startRecording"
        @touchend="endRecording"
        ref="voiceInput"
        :class="voiceState !== 0 ? 'bg-secondary-focus' : 'bg-secondary'"
        class="w-3/5 text-center text-primary py-2 rounded-full shadow-blue"
    >
        按住说话
    </div>

    <!-- toast -->
    <teleport to="body" v-if="voiceState">
        <ChatInputVoiceToastVue :voiceState="voiceState" :timeout="timeCount" />
    </teleport>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from '@vue/runtime-core'
import { dom } from 'quasar'
import ChatInputVoiceToastVue from './ChatInputVoiceToast.vue'

export default defineComponent({
    components: { ChatInputVoiceToastVue },

    setup() {
        /** 文本输入框 div 元素 */
        const voiceInput = ref<HTMLDivElement | null>(null)

        /** 禁止语音输入框长按弹出菜单 */
        onMounted(() => {
            voiceInput.value && voiceInput.value.addEventListener('contextmenu', (e) => e.preventDefault())
        })

        /** 语音输入状态 */
        enum VoiceState {
            /** 未在录音 */
            notRecording = 0,
            /** 录音中 */
            endRecording,
            /** 按住状态下上划，欲取消发送 */
            cancel,
            /** 按住时间太短 */
            tooShort,
        }
        const voiceState = ref(VoiceState.notRecording)

        /** 用户上划取消发送时变为 true */
        const shouldCancelRecording = ref(false)

        /** 计算按住语音按钮的时间 */
        let startDate: number

        /** 语音时长上限 */
        const timeCount = ref(10)

        /** 按住按钮的时间 */
        let interval: number
        const startRecording = (): void => {
            voiceState.value = VoiceState.endRecording
            startDate = Date.now()
            interval = window.setInterval(() => {
                if (timeCount.value === 0) {
                    clearInterval(interval)
                    timeCount.value = 10

                    voiceState.value = VoiceState.notRecording
                    sendVoiceMessage()
                } else {
                    timeCount.value--
                }
            }, 1000)
        }

        /** 松开语音按钮 */
        const endRecording = () => {
            if (voiceState.value === VoiceState.notRecording) return

            clearInterval(interval)
            timeCount.value = 10

            // 按住时长小于 1 秒，提示太短
            if (Date.now() - startDate < 1000 && !shouldCancelRecording.value) {
                voiceState.value = VoiceState.tooShort
                setTimeout(() => {
                    if (voiceState.value === VoiceState.tooShort) {
                        voiceState.value = VoiceState.notRecording
                    }
                }, 1000)
            } else {
                voiceState.value = VoiceState.notRecording
                sendVoiceMessage()
            }
        }

        const sendVoiceMessage = (): void => {
            if (shouldCancelRecording.value) {
                shouldCancelRecording.value = false
                return
            }
            console.log('发送语音')
        }

        const cancelRecording = (e: TouchEvent): void => {
            /** 求语音输入按钮与视口的高度差 */
            const { offset } = dom
            let offsetTop = 0
            if (voiceInput.value) {
                offsetTop = offset(voiceInput.value).top
            }
            if (e.touches[0].clientY < offsetTop) {
                shouldCancelRecording.value = true
                voiceState.value = VoiceState.cancel
            } else {
                shouldCancelRecording.value = false
                voiceState.value = VoiceState.endRecording
            }
        }

        return {
            voiceInput,
            voiceState,
            startRecording,
            endRecording,
            cancelRecording,
            timeCount,
        }
    },
})
</script>
