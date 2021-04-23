<template>
    <q-dialog id="viewer" ref="dialogRef" @hide="onDialogHide">
        <q-img v-if="type === 'image'" @click="onCancelClick" :src="url" :ratio="ratio" class="w-full" no-spinner />
        <div v-else>
            <q-btn color="dark" icon="close" round class="absolute top-4 right-4 z-10" @click="onCancelClick" />
            <video id="viewer__player" autoplay loop class="h-screen w-screen absolute top-0 left-0" controls>
                <source :src="url" type="video/mp4" />
            </video>
        </div>
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { useDialogPluginComponent } from 'quasar'
import Plyr from 'plyr'

export default defineComponent({
    props: {
        /** 'image' | 'video' */
        type: String,
        url: String,
        ratio: Number,
    },

    emits: [...useDialogPluginComponent.emits],

    setup(props) {
        const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

        if (props.type === 'video') {
            new Plyr('#viewer__player')
        }

        return {
            dialogRef,
            onDialogHide,

            onOKClick() {
                onDialogOK()
            },

            onCancelClick: onDialogCancel,
        }
    },
})
</script>