<template>
    <ChatInputMenuButtonVue @click="chooseImage" label="图片/视频" :iconUrl="iconUrl" />

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
import { defineComponent, ref } from 'vue'
import iconUrl from '@/assets/input_menu_album.png'
import ChatInputMenuButtonVue from '@/views/ChatInputMenuButton.vue'

export default defineComponent({
    components: { ChatInputMenuButtonVue },

    setup() {
        const input = ref<null | HTMLInputElement>(null)
        const receiveImage = () => {
            console.log(123)
        }
        const chooseImage = () => {
            input.value?.click()
        }
        return { iconUrl, input, receiveImage , chooseImage}
    },
})
</script>
