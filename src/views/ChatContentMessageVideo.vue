<template>
    <q-img
        @click="viewVideo"
        :src="posterImgSrc"
        :ratio="content.width / content.height"
        class="bg-white w-36 relative rounded-md"
        style="max-height: 150px; min-height: 100px"
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
                />
            </div>
            <div v-else @click="playVideo" class="absolute-full flex flex-center">
                <q-avatar font-size="52px" text-color="white" icon="play_circle" />
            </div>
        </transition>
    </q-img>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import MediaViewerVue from '@/components/MediaViewer.vue'

export default defineComponent({
    props: { fromMyself: Boolean, content: { type: Object, required: true }, state: String, uploadProgress: Object },

    setup(props) {
        const posterImgSrc = ref<string | undefined>(undefined)

        const videoSource: File | string = props?.content?.rawMessage || props?.content?.mediaUrl
        let videoUrl: string
        if (videoSource instanceof File) {
            videoUrl = URL.createObjectURL(videoSource)
        } else {
            videoUrl = videoSource
        }
        drawVideoToCanvas(videoUrl).then((canvas: HTMLCanvasElement) => {
            canvas.toBlob((blob) => {
                posterImgSrc.value = URL.createObjectURL(blob)
            })
        })

        const showProgress = computed(() => {
            if (props.state === 'pending') {
                return props.uploadProgress != undefined && props.uploadProgress.percentage < 100
            } else {
                return false
            }
        })

        const quasar = useQuasar()
        const viewVideo = () => {
            quasar.dialog({
                component: MediaViewerVue,
                componentProps: {
                    type: 'video',
                    url: props?.content?.mediaUrl,
                    ratio: props?.content?.width / props?.content?.height,
                },
            })
        }

        return { posterImgSrc, showProgress, viewVideo }
    },
})

function drawVideoToCanvas(url: string): Promise<HTMLCanvasElement> {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas')
        const video = document.createElement('video')
        video.crossOrigin = 'anonymous'

        video.onloadedmetadata = () => {
            video.currentTime = 0
        }

        video.onseeked = () => {
            // delay the drawImage call, otherwise we get an empty canvas on iOS
            // see https://stackoverflow.com/questions/44145740/how-does-double-requestanimationframe-work
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    canvas.height = video.videoHeight
                    canvas.width = video.videoWidth
                    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)

                    resolve(canvas)
                })
            })
        }

        video.onerror = () => {
            reject(video.error)
        }

        video.src = url
        video.load()
    })
}
</script>

<style scoped></style>
