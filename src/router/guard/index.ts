import type { Router } from 'vue-router';
import { setRouteEmitter } from '@/utils/route-listener';
import setupUserLoginInfoGuard from './userLoginInfo';
import setupPermissionGuard from './permission';
import { useAppStore } from '@/store';

function setupPageGuard(router: Router) {
    router.beforeEach(async (to) => {
        // emit route change
        setRouteEmitter(to);
        useAppStore().updateLastRouter(to.name, to.meta.locale, to.meta.icon);
    });
}

export default function createRouteGuard(router: Router) {
    setupPageGuard(router);
    setupUserLoginInfoGuard(router);
    setupPermissionGuard(router);
}
