import { useRouter } from 'vue-router'
import { msgSuccess } from '@/utils'

import { useUserStore } from '@/store'
import { useI18n } from 'vue-i18n'

// TODO: 这个要作为 hook 有什么好处？
export default function useUser() {
    const router = useRouter()
    const userStore = useUserStore()
    const { t } = useI18n()

    const logout = async (logoutTo?: string) => {
        await userStore.logout()
        const currentRoute = router.currentRoute.value

        msgSuccess(t('user.logout.success'))
        router.push({
            name: logoutTo && typeof logoutTo === 'string' ? logoutTo : 'login',
            query: {
                ...router.currentRoute.value.query,
                redirect: currentRoute.name as string,
            },
        })
    }
    return {
        logout,
    }
}
