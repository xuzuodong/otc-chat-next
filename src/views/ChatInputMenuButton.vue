<template>
    <div class="mx-2.5 mt-1.5" @click="$emit('click')">
        <div><q-img :src="iconUrl" :ratio="1" width="60px" height="60px" /></div>
        <div class="text-center mt-1">{{ label }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        label: { type: String, required: true },
        iconUrl: { type: String, required: true },
    },

    emits: ['click'],

    setup() {
        return {}
    },
})
</script>

<style scoped>
</style>