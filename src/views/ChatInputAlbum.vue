<template>
    <ChatInputMenuButtonVue @click="input.click()" label="图片/视频" :iconUrl="iconUrl" />

    <input
        v-show="false"
        ref="input"
        name="file"
        type="file"
        accept="image/png, image/gif, image/jpg, image/jpeg"
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
            }

            input.value = '' // 防止 image input 第二次上传同一张图片失效
        }

        return { iconUrl, input, receiveImage }
    },
})
</script>
