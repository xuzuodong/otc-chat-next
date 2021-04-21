<template>
    <q-img
        :src="imgSrc"
        :ratio="content.width / content.height"
        class="bg-white w-36 relative rounded-md"
        style="max-height: 150px"
        :no-spinner="fromMyself"
        spinner-size="md"
        spinner-color="primary"
    >
        <!-- 图片上灰色遮罩 -->
        <transition name="fade">
            <div
                v-if="uploadProgress != undefined && uploadProgress.percentage < 100"
                class="absolute-full flex flex-center"
            >
                <!-- 上传进度圆圈 -->
                <q-circular-progress
                    :value="uploadProgress.percentage"
                    size="45px"
                    :thickness="1"
                    color="white"
                    track-color="grey-6"
                    class="q-ma-md"
                /></div
        ></transition>
    </q-img>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    props: { fromMyself: Boolean, content: Object, uploadProgress: Object },

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
