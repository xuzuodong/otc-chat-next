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
import { dtalk } from '@/utils/fzm-message-protocol-chat/protobuf'
import { messageStore } from '@/store/messagesStore'
import { ChatMessageTypes } from '@/types/chatMessageTypes'

export default defineComponent({
    components: { ChatInputMenuButtonVue },
    setup() {
        const quasar = useQuasar()

        const fakeCardInfo: dtalk.proto.ICardMsg = {
            bank: '中国建设银行',
            name: '张三',
            account: '**** 229',
        }

        const fakeAlipayAccount = '123****1234'
        const fakeWechatAccount = '123****@qq.com'

        /** 弹出 “选择收款方式” 对话框 */
        const selectReceiveMoneyMethods = () => {
            quasar
                .dialog({
                    component: ChatInputReceiptDialogVue,
                    componentProps: {
                        receiveMethods: [
                            { accountName: fakeCardInfo.bank, accountAddress: fakeCardInfo.account },
                            { accountName: '支付宝', accountAddress: fakeAlipayAccount },
                            { accountName: '微信', accountAddress: fakeWechatAccount },
                        ],
                    },
                })
                .onOk(() => {
                    messageStore.sendMessage(ChatMessageTypes.Card, {
                        bank: fakeCardInfo.bank,
                        name: fakeCardInfo.name,
                        account: fakeCardInfo.account,
                    })
                })
        }

        return { iconUrl, selectReceiveMoneyMethods }
    },
})
</script>
