<template>
    <ChatInputMenuButtonVue @click="selectReceiveMoneyMethods" label="收款方式" :iconUrl="iconUrl" />
</template>

<script lang="ts">
/**
 * 发送收款方式
 *     1. 如果选择的收款方式是银行卡，发送「卡片消息」
 *     2. 如果选择的收款方式是微信/支付宝，发送对应二维码的图片
 */

import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import iconUrl from '@/assets/input_menu_receive.png'
import ChatInputMenuButtonVue from '@/views/ChatInputMenuButton.vue'
import ChatInputReceiptDialogVue from './ChatInputReceiptDialog.vue'
import { messageStore } from '@/store/messagesStore'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import { orderInfo } from '@/store/appCallerStore'

export default defineComponent({
    components: { ChatInputMenuButtonVue },
    setup() {
        const quasar = useQuasar()

        /** 弹出 “选择收款方式” 对话框 */
        const selectReceiveMoneyMethods = () => {
            if (!orderInfo.value) return

            const receiveMethods = orderInfo.value.pay.map((m) => ({
                accountName: m.bankName,
                accountAddress: m.cardId,
                accountType: m.type,
            }))

            quasar
                .dialog({
                    component: ChatInputReceiptDialogVue,
                    componentProps: {
                        receiveMethods,
                    },
                })
                .onOk((selectedMap: boolean[]) => {
                    let payShowed = false

                    orderInfo.value?.pay.forEach((m, index) => {
                        if (!selectedMap[index]) return

                        if (!payShowed) {
                            messageStore.showPay()
                            payShowed = true
                        }

                        switch (m.type) {
                            case '1':
                                // 银行卡
                                messageStore.sendMessage(ChatMessageTypes.Card, {
                                    bank: m.bankName,
                                    name: m.name,
                                    account: m.cardId,
                                })
                                break
                            default:
                                // 支付宝 | 微信
                                messageStore.sendMessage(ChatMessageTypes.Image, {
                                    mediaUrl: m.codeImage,
                                    height: 200,
                                    width: 200,
                                })
                                break
                        }
                    })
                })
        }

        return { iconUrl, selectReceiveMoneyMethods }
    },
})
</script>
