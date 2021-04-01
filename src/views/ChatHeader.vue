<template>
    <!-- 顶部导航栏 -->
    <div class="h-chat-header bg-white flex flex-row justify-between">
        <div class="w-10 text-center flex justify-center items-center">
            <i class="iconfont text-lg">&#xe606;</i>
        </div>
        <div class="self-center font-bold text-lg">对方昵称</div>
        <div class="w-10 text-center flex justify-center items-center">
            <!-- <i class="iconfont text-3xl"> &#xe607;</i> -->
        </div>
    </div>

    <!-- 订单信息栏 -->
    <div class="h-20 rounded-b-3xl bg-white flex justify-between px-4">
        <div class="pt-2">
            <div class="text-subtle text-sm pb-1">交易总额</div>
            <div class="text-bold text-primary text-xl">￥{{ 1200 }}</div>
        </div>
        <div class="pt-2 text-right">
            <div class="text-dark pb-1"><i class="iconfont text-gray-300">&#xe608;</i> {{ '14:55' }}</div>
            <div class="text-bold text-primary text-xl">{{ '请付款' }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return {}
    },
})
</script>
