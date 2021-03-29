<template>
    <div class="home">
        <h2>This is a Vue 3 component!</h2>
        <button @click="increase">Clicked {{ count }} times.</button>
        <q-btn color="primary" icon="check" label="OK" @click="onClick" />
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
    setup() {
        const count = ref(0)
        const increase = () => {
            count.value++
        }

        const onClick = () => {
            console.log(123)
        }
        
        return {
            count,
            increase,
            onClick,
        }
    },
})
</script>
