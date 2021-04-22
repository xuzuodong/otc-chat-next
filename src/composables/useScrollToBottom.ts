import { ref, Ref } from 'vue'
import { QScrollArea } from 'quasar'

export default (): { scrollArea: Ref<QScrollArea | null>; scrollToBottom: () => void } => {
    /** QScrollArea 组件 */
    const scrollArea = ref<QScrollArea | null>(null)

    /** 滚动至 scrollArea 的最底部 */
    const scrollToBottom = () => {
        if (scrollArea.value) {
            // 滚动至最底部
            const scrollTarget = scrollArea.value.getScrollTarget()
            scrollArea.value.setScrollPosition('vertical', scrollTarget.scrollHeight, 300)
        }
    }

    return { scrollArea, scrollToBottom }
}
