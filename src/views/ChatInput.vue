<template>
    <div class="flex justify-between items-center min-h-input-bar bg-white">
        <div class="w-7 h-7 mx-2.5 text-center">
            <i class="iconfont text-primary text-xl">&#xe604;</i>
        </div>
        <q-input
            @keydown.enter.prevent="sendChatMessage"
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
import { defineComponent, onMounted, ref } from 'vue'
import { connectionState } from '@/store/connectionState'
import encodeChatMessage from '@/utils/fzm-message-protocol-chat/encodeChatMessage'
import { ChatMessageTypes } from '@/utils/fzm-message-protocol-chat/chatMessageTypes'
import { messageStore } from '@/store/messagesState'
import { useRoute } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
    setup() {
        const inputText = ref('')
        const route = useRoute()
        const sendChatMessage = () => {
            if (inputText.value.length === 0) return
            
            const uuid = uuidv4()

            const messageContentData = encodeChatMessage({
                msgType: ChatMessageTypes.Text,
                target: (route.query.token as string) ? '1' : '2',
                from: (route.query.token as string) || '1',
                msg: inputText.value,
                uuid: uuid,
            })

            messageStore.pushMessage({
                content: inputText.value,
                from: route.query.token as string,
                uuid: uuid,
            })

            connectionState.connection?.sendMessage(messageContentData)
            inputText.value = ''
        }

        onMounted(() => {
            console.log('userid:' + (route.query.token || '1'))
            console.log('targetid: ' + ((route.query.token as string) ? '1' : '2'))
        })

        return { inputText, sendChatMessage }
    },
})
</script>
