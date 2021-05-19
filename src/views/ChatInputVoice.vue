<template>
    <div
        @touchmove.prevent="cancelRecording"
        @touchstart="startRecording"
        @touchend="endRecording"
        ref="voiceInput"
        :class="[
            voiceState !== 0 ? 'bg-secondary-focus' : 'bg-secondary',
            disableVoiceInput ? 'cursor-not-allowed' : '',
            disableVoiceInput ? ' opacity-30' : '',
        ]"
        class="w-3/5 text-center text-primary py-2 rounded-full shadow-blue select-none"
    >
        按住说话
    </div>

    <!-- toast -->
    <teleport to="body" v-if="voiceState">
        <ChatInputVoiceToastVue :voiceState="voiceState" :timeout="timeCount" />
    </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/runtime-core'
import { dom, useQuasar } from 'quasar'
import ChatInputVoiceToastVue from './ChatInputVoiceToast.vue'
import Recorder from 'js-audio-recorder'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import { messageStore } from '@/store/messagesStore'
import { MessageContent } from '@/types/chat-message'

export default defineComponent({
    components: { ChatInputVoiceToastVue },

    setup() {
        const quasar = useQuasar()

        /** 文本输入框 div 元素 */
        const voiceInput = ref<HTMLDivElement | null>(null)

        let recorder: Recorder

        const disableVoiceInput = ref(false)
        onMounted(() => {
            if (voiceInput.value) {
                /** 监听鼠标拖拽 */
                listenDragOut(voiceInput.value)

                /** 禁止语音输入框长按弹出菜单 */
                voiceInput.value.addEventListener('contextmenu', (e) => e.preventDefault())
            }

            recorder = new Recorder()

            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    stream && stream.getTracks().forEach((track) => track.stop())
                })
                .catch(() => {
                    disableVoiceInput.value = true
                    quasar.dialog({
                        title: '调用麦克风失败',
                        message: '无法调用您设备上的麦克风，因此无法使用发送语音功能',
                    })
                })
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
        /** 语音输入界面状态 */
        const voiceState = ref(VoiceState.notRecording)

        /**
         * 用于在发出消息前确认该条消息是否应该被中止，
         * 用户上划取消发送时变为 true
         */
        const shouldCancelRecording = ref(false)

        /** 计算按住语音按钮的时间 */
        let startDate: number

        /** 语音时长上限 */
        const timeCount = ref(10)

        /** 按住按钮的时间 */
        let interval: number
        const startRecording = (): void => {
            if (disableVoiceInput.value) return
            recorder.start()

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

            recorder.stop()

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

            if (!recorder.duration) return

            const audioMessageContent: MessageContent = {
                mediaUrl: '',
                time: parseInt(recorder.duration.toFixed(0)),
                rawMessage: recorder.getWAVBlob(),
            }
            messageStore.sendMessage(ChatMessageTypes.Audio, audioMessageContent)
        }

        const cancelRecording = (e: TouchEvent | MouseEvent): void => {
            // voiceInput 元素的顶端 y 坐标
            // 用于判断是否需要取消发送
            const { offset } = dom
            let offsetTop = 0
            if (voiceInput.value) {
                offsetTop = offset(voiceInput.value).top
            }

            // 用户手指 / 鼠标的 y 坐标
            let userY
            if (e instanceof TouchEvent) {
                userY = e.touches[0].clientY
            } else {
                userY = e.y
            }

            if (userY < offsetTop) {
                shouldCancelRecording.value = true
                voiceState.value = VoiceState.cancel
            } else {
                shouldCancelRecording.value = false
                voiceState.value = VoiceState.endRecording
            }
        }

        /** 监听 voiceInput 的鼠标 `按住+拖拽+松开` 事件，以取消发送语音*/
        function listenDragOut(ele: HTMLDivElement) {
            let fromEle = false
            ele.addEventListener('mousedown', (e) => {
                if (disableVoiceInput.value) return
                e.stopPropagation()
                fromEle = true
                startRecording()
            })
            document.body.addEventListener('mousedown', () => (fromEle = false))

            document.body.addEventListener('mousemove', (e) => fromEle && cancelRecording(e))

            ele.addEventListener('mouseup', (e) => {
                e.stopPropagation()
                if (fromEle) endRecording()
                fromEle = false
            })
            document.body.addEventListener('mouseup', () => {
                if (fromEle) endRecording()
                fromEle = false
            })
        }

        return {
            voiceInput,
            voiceState,
            startRecording,
            endRecording,
            cancelRecording,
            timeCount,
            disableVoiceInput,
        }
    },
})
</script>
