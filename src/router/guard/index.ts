import type { Router } from 'vue-router'
import { setRouteEmitter } from '@/utils/route-listener'
import setupUserLoginInfoGuard from './userLoginInfo'
import NProgress from 'nprogress' // progress bar
// import setupPermissionGuard from './permission'

function setupPageGuard(router: Router) {
    router.beforeEach(async (to) => {
        NProgress.start()
        // 路由变更时，发布，此时其他订阅者将会执行对应的副作用
        setRouteEmitter(to)
    })
    router.afterEach(async (to) => {
        NProgress.done()
    })
}

export default function createRouteGuard(router: Router) {
    setupPageGuard(router)
    setupUserLoginInfoGuard(router)
    // setupPermissionGuard(router)
}
