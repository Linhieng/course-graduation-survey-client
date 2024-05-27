import { useTabBarStore } from '@/store';
import { REDIRECT_ROUTE_NAME } from '@/router/constants';
import type { Router } from 'vue-router';

/**
 * 通过重新加载组件，实现不刷新页面，但刷新数据。
 * @param router 需要从组件中通过 useRouter() 传递过来，不使用 import router from '@/router'; 是因为它有时候 push 不生效。
 * @param route 这个参数直接不需要了。因为它可以从 router 获取
 */
export async function reloadRouter(router: Router) {
    const route = router.currentRoute.value;
    const tabBarStore = useTabBarStore();
    tabBarStore.deleteCache(route as any);

    // 这里的 push 有时不生效，不如 useRouter 中获取到的 router。
    await router.push({
        name: REDIRECT_ROUTE_NAME,
        params: {
            path: route.fullPath,
        },
    });
    tabBarStore.addCache(route as any);
}
