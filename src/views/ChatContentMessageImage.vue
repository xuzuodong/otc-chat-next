<template>
    <q-img
        :src="imgSrc"
        :ratio="content.width / content.height"
        class="bg-white w-36 relative rounded-md"
        style="max-height: 150px"
        :no-spinner="fromMyself"
        spinner-size="md"
        spinner-color="primary"
    />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    props: { fromMyself: Boolean, content: Object },

    setup(props) {
        const imgSrc = computed(() => {
            if (props.fromMyself) {
                if (props?.content?.rawMessage) {
                    return URL.createObjectURL(props?.content?.rawMessage)
                } else {
                    return props?.content?.mediaUrl
                }
            } else {
                return props?.content?.mediaUrl
            }
        })
        return { imgSrc }
    },
})
</script>
