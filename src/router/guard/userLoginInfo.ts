import type { Router, LocationQueryRaw } from 'vue-router'

import { useUserStore } from '@/store'
import { isLogin } from '@/utils/auth'

export default function setupUserLoginInfoGuard(router: Router) {
    router.beforeEach(async (to) => {
        if (
            // 如果进入页面要求登录
            to.meta.requiresAuth &&
            // 而且用户没有登录
            !isLogin() &&
            // 同时不是去往 login
            to.name !== 'login' // ❗️ 避免无限重定向
            // 的话，直接跳转到 login 让用户登录
        ) {
            // 将用户重定向到登录页面
            return { name: 'login' }
        }
    })
}
