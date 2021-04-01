<template>
    <div class="flex justify-between items-center min-h-input-bar bg-white">
        <div class="w-7 h-7 mx-2.5 text-center">
            <i class="iconfont text-primary text-xl">&#xe604;</i>
        </div>
        <q-input
            borderless
            class="flex-grow"
            v-model="inputText"
            type="text"
            placeholder="想说点什么呢..."
            :input-class="['text-base']"
            autogrow
            input-style="max-height: 6em"
        />
        <div class="w-7 h-7 mx-2.5 text-center">
            <i class="iconfont text-primary text-xl">&#xe605;</i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const inputText = ref('')
        return { inputText }
    },
})
</script>
