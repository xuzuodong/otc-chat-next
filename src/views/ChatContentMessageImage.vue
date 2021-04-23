<template>
    <q-img
        @click="viewImage"
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
            <div v-if="showProgress" class="absolute-full flex flex-center">
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
import { useQuasar } from 'quasar'
import MediaViewerVue from '@/components/MediaViewer.vue'

export default defineComponent({
    props: { fromMyself: Boolean, content: Object, state: String, uploadProgress: Object },

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

        const showProgress = computed(() => {
            if (props.state === 'pending') {
                return props.uploadProgress != undefined && props.uploadProgress.percentage < 100
            } else {
                return false
            }
        })

        const quasar = useQuasar()
        const viewImage = () => {
            quasar
                .dialog({
                    component: MediaViewerVue,
                    componentProps: {
                        type: 'image', 
                        url: imgSrc.value, 
                        ratio: props?.content?.width / props?.content?.height
                    },
                })
        }

        return { imgSrc, showProgress, viewImage }
    },
})
</script>
