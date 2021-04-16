<template>
    <ChatInputMenuButtonVue label="图片/视频" :iconUrl="iconUrl" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import iconUrl from '@/assets/input_menu_album.png'
import ChatInputMenuButtonVue from '@/views/ChatInputMenuButton.vue'

export default defineComponent({
    components: { ChatInputMenuButtonVue },

    setup() {
        return { iconUrl }
    },
})
</script>
