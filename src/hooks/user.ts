import { useRouter } from 'vue-router'

import { useUserStore } from '@/store'
import { msgSuccess } from '@/utils'

// TODO: 这个要作为 hook 有什么好处？
export default function useUser() {
    const router = useRouter()
    const userStore = useUserStore()

    const logout = async (logoutTo?: string) => {
        await userStore.logout()
        msgSuccess('msg.user.logout.success')
        const currentRoute = router.currentRoute.value
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
