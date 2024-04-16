import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { msgSuccess } from '@/utils'

export default function useLocale() {
    const i18 = useI18n()
    const currentLocale = computed(() => {
        return i18.locale.value
    })
    const changeLocale = (value: string) => {
        if (i18.locale.value === value) {
            return
        }
        i18.locale.value = value
        localStorage.setItem('locale', value)
        msgSuccess('navbar.action.locale')
    }
    const toggleZhEn = () => {
        const locale = i18.locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
        changeLocale(locale)
    }
    return {
        currentLocale,
        changeLocale,
        toggleZhEn,
    }
}
