import { ref, Ref } from '@vue/reactivity'

class TextInputStore {
    inputText: Ref<string>

    constructor() {
        this.inputText = ref('')
    }

    clearTextMessage() {
        this.inputText.value = ''
    }
}

export const textInputStore = new TextInputStore()