<template>
    <ChatInputMenuButtonVue label="收款方式" :iconUrl="iconUrl" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import iconUrl from '@/assets/input_menu_receive.png'
import ChatInputMenuButtonVue from '@/views/ChatInputMenuButton.vue'

export default defineComponent({
    components: { ChatInputMenuButtonVue },

    setup() {
        return { iconUrl }
    },
})
</script>
