<template>
    <!-- 发送收款方式 -->
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin relative p-2.5">
            <!-- header -->
            <q-card-section align="center" class="my-0 py-2">
                <q-btn @click="cancel" full-width class="absolute top-0 right-0" icon="close" round flat />
                <h4 class="text-center text-dark text-xl font-bold my-1.5">发送收款方式</h4>
            </q-card-section>
            <!-- 收款方式列表 -->
            <div
                v-for="(receiveMethod, index) in receiveMethods"
                :key="receiveMethod.accountAddress"
                :class="selectedMap[index] ? 'bg-secondary' : 'bg-gray-100'"
                class="mx-2 h-12 rounded-2xl"
            >
                <div
                    @click="selectedMap[index] ? (selectedMap[index] = false) : (selectedMap[index] = true)"
                    class="h-full flex items-center mx-1 my-2"
                >
                    <i :class="[selectedMap[index] ? 'text-primary' : 'text-gray-300']" class="iconfont text-lg mx-2">
                        {{ selectedMap[index] ? '&#xe60e;' : '&#xe618;' }}
                    </i>
                    <!-- 收款信息 -->
                    <div
                        :class="{
                            'text-primary': selectedMap[index],
                        }"
                        class="flex justify-between flex-grow text-right pr-2"
                    >
                        <div>{{ receiveMethod.accountName }}</div>
                        <div>{{ receiveMethod.accountAddress }}</div>
                    </div>
                </div>
            </div>
            <!-- 确定按钮 -->
            <q-card-actions align="center">
                <q-btn class="w-full h-10" color="primary" unelevated label="确认" @click="ok" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang='ts'>
import { defineComponent, PropType, reactive } from '@vue/runtime-core'
import { useDialogPluginComponent } from 'quasar'

interface ReceiveMethod {
    accountName: string
    accountAddress: string
}

export default defineComponent({
    props: {
        receiveMethods: {
            type: Array as PropType<ReceiveMethod[]>,
            required: true,
        },
    },

    emits: [...useDialogPluginComponent.emits],

    setup(props) {
        /**
         * 本 SFC 由 Quasar 的命令式方法调起，用法和传统的 Vue 子组件不同
         * @see https://next.quasar.dev/quasar-plugins/dialog#invoking-custom-component
         */
        const { dialogRef, onDialogOK, onDialogHide, onDialogCancel } = useDialogPluginComponent()

        /** 记录用户选了哪几种收款方式 */
        const selectedMap = reactive(props.receiveMethods.map(() => false))
        selectedMap[0] === false && (selectedMap[0] = true) // 默认勾选第一种

        /** 点击确定收款 */
        const ok = () => {
            onDialogOK(selectedMap)
        }

        return {
            dialogRef,
            ok,
            selectedMap,
            onDialogHide,
            cancel: onDialogCancel,
        }
    },
})
</script>