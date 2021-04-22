<template>
    <ChatInputMenuButtonVue @click="input.click()" label="图片/视频" :iconUrl="iconUrl" />

    <input
        v-show="false"
        ref="input"
        name="file"
        type="file"
        accept=".png, .jpg, .jpeg, .gif, .mov, .mp4, .m4v"
        @change="receiveImage"
    />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import iconUrl from '@/assets/input_menu_album.png'
import ChatInputMenuButtonVue from '@/views/ChatInputMenuButton.vue'
import { messageStore } from '@/store/messagesStore'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import compress from '@/utils/compressor'

export default defineComponent({
    components: { ChatInputMenuButtonVue },

    setup() {
        const input = ref<HTMLInputElement | null>(null)

        const receiveImage = async (e: Event) => {
            const input = e.target as HTMLInputElement
            const file = input.files && input.files[0]
            if (!file) return

            // 接收图片
            if (file.name.match(/(.jpg$)|(.gif$)|(.jpeg$)|(.png$)/)) {
                const compressedFile = await compress(file)

                // 利用 Image 获取尺寸
                const img = new Image()
                img.src = URL.createObjectURL(compressedFile)

                img.onload = () => {
                    if (!compressedFile) return

                    const imageMessageContent = reactive({
                        mediaUrl: '',
                        height: img.height,
                        width: img.width,
                        rawMessage: compressedFile,
                    })

                    messageStore.sendMessage(ChatMessageTypes.Image, imageMessageContent)
                    URL.revokeObjectURL(img.src)
                }
            }

            // 接收视频
            else if (file.name.match(/(.mp4$)|(.mov$)|(.m4a$)/)) {
                var video = document.createElement('video')
                video.src = URL.createObjectURL(file)
                video.onloadedmetadata = () => {
                    if (file.size > 104857600) {
                        alert('视频文件过大，目前仅支持发送 100MB 以内的视频')
                        return
                    }

                    const videoMessageContent = reactive({
                        mediaUrl: '',
                        height: video.videoHeight,
                        width: video.videoWidth,
                        time: video.duration,
                        rawMessage: file,
                    })

                    messageStore.sendMessage(ChatMessageTypes.Video, videoMessageContent)
                    URL.revokeObjectURL(video.src)
                }
            }

            input.value = '' // 防止 image input 第二次上传同一张图片失效
        }

        return { iconUrl, input, receiveImage }
    },
})
</script>
