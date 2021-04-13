<template>
    <div
        class="absolute bg-black text-white h-2/6 w-7/12 top-1/2 left-1/2 rounded-lg transform -translate-x-1/2 -translate-y-1/2"
    >
        <div v-if="voiceState == 1" class="flex flex-col justify-around items-center h-full w-full">
            <div class="mt-6 flex justify-center">
                <i class="text-8xl iconfont">&#xe60a;</i>
                <i class="text-8xl iconfont">&#xe609;</i>
            </div>
            <div class="text-center text-base mb-6">
                <div>手指上滑，取消发送</div>
                <div>还可以说{{timeout}}秒</div>
            </div>
        </div>

        <div v-else-if="voiceState == 2" class="flex flex-col justify-around items-center h-full w-full">
            <div class="mt-5">
                <i class="text-8xl iconfont">&#xe60b;</i>
            </div>
            <div class="mb-5 text-base text-negative-2">松开手指，取消发送</div>
        </div>

        <div v-else class="flex flex-col justify-around items-center h-full w-full">
            <div class="mt-9">
                <i class="text-8xl iconfont">&#xe60c;</i>
            </div>
            <div class="mb-9 text-base text-white">录音时间太短</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        voiceState: Number,
        timeout: Number
    },
    setup() {
        return {}
    },
})
</script>