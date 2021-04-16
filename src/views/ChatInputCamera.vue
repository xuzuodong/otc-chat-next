<template>
    <ChatInputMenuButtonVue label="拍摄" :iconUrl="iconUrl" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import iconUrl from '@/assets/input_menu_camera.png'
import ChatInputMenuButtonVue from '@/views/ChatInputMenuButton.vue'

export default defineComponent({
    components: { ChatInputMenuButtonVue },

    setup() {
        return { iconUrl }
    },
})
</script>
