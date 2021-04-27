<template>
    <!-- 顶部导航栏 -->
    <div class="h-chat-header bg-white flex flex-row justify-between">
        <div @click="close" class="w-10 text-center flex justify-center items-center">
            <i class="iconfont text-lg">&#xe606;</i>
        </div>
        <div class="self-center font-bold text-lg">{{ targetNick }}</div>
        <div class="w-10 text-center flex justify-center items-center">
            <!-- <i class="iconfont text-3xl"> &#xe607;</i> -->
        </div>
    </div>

    <!-- 订单信息栏 -->
    <div class="h-20 rounded-b-3xl bg-white flex justify-between px-4">
        <div class="pt-2">
            <div class="text-subtle text-sm pb-1">交易总额</div>
            <div class="text-bold text-primary text-xl">￥{{ orderInfo?.cost }}</div>
        </div>
        <div class='pt-2 text-right'>
            <div :class="{ 'opacity-0': !orderInfo?.levelTime }" class='text-dark pb-1'>
                <i class='iconfont text-gray-300'>&#xe608;</i> {{ timeLeft }}
            </div>
            <div class='text-bold text-primary text-xl'>{{ orderInfo?.status }}</div>
        </div>
    </div>

    <div v-if="debug">
        <div>from: {{ from }}</div>
        <div>token: {{ token }}</div>
        <div>orderid: {{ orderid }}</div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { from, token, orderid, getOrderInfo, OrderInfo } from '@/store/appCallerStore'
import jsBridge from '@/utils/jsBridge'

export default defineComponent({
    setup() {
        const debug = process.env.NODE_ENV === 'development'

        const close = () => new jsBridge().closeCurrentWebview()

        const orderInfo = ref<OrderInfo | undefined>(undefined)
        getOrderInfo().then((info) => (orderInfo.value = info))

        const targetNick = computed(() => {
            return from == orderInfo.value?.userId ? orderInfo.value?.merchantNick : orderInfo.value?.userNick
        })

        // 计算剩余时间
        const timeLeft = computed(() => {
            const levelTime = orderInfo.value?.levelTime
            if (!levelTime) return

            const minutesRemain = (levelTime / 60).toFixed(0)
            let secondsRemain = (levelTime % 60).toString()
            if (secondsRemain.length === 1) secondsRemain = '0' + secondsRemain
            return minutesRemain + ':' + secondsRemain
        })

        // 倒数剩余时间
        setInterval(() => {
            if (!orderInfo.value?.levelTime) return
            orderInfo.value.levelTime--
        }, 1000)

        return { from, token, orderid, debug, close, targetNick, orderInfo, timeLeft }
    },
})
</script>
