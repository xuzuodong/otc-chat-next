import { ref, Ref } from '@vue/reactivity'

class TextInputStore {
    /** 用户在文本消息框内输入的文字 */
    inputText: Ref<string>

    constructor() {
        this.inputText = ref('')
    }

    clearTextMessage() {
        this.inputText.value = ''
    }
}

/** 全局管理用户在文本消息框内输入的文字 */
export const textInputStore = new TextInputStore()
