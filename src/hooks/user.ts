import { useRouter } from 'vue-router';

import { useUserStore } from '@/store';
import { msgSuccess } from '@/utils/msg';

export default function useUser() {
    const router = useRouter();
    const userStore = useUserStore();
    const logout = async (logoutTo?: string) => {
        await userStore.logout();
        const currentRoute = router.currentRoute.value;
        msgSuccess('登出成功');
        router.push({
            name: logoutTo && typeof logoutTo === 'string' ? logoutTo : 'login',
            query: {
                ...router.currentRoute.value.query,
                redirect: currentRoute.name as string,
            },
        });
    };
    return {
        logout,
    };
}
