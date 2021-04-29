<template>
    <div :class="fromMyself ? 'bg-secondary' : 'bg-white'" class="w-full h-24 rounded-md font-medium">
        <div class="py-3 px-3 flex items-center  enable-touch">
            <q-icon :name="'img:' + iconUrl" size="28px" class="mr-1" /> {{ content.bank }}
        </div>
        <div class="pb-3 px-2 flex flex-nowrap justify-between text-base break-all  enable-touch">
            <div>{{ content.name }}</div>
            <div>{{ content.account }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import iconUrl from '@/assets/message_bank_card.png'

export default defineComponent({
    props: { fromMyself: Boolean, content: Object },

    setup() {
        return { iconUrl }
    },
})
</script>
