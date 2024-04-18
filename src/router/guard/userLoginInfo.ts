import type { Router, LocationQueryRaw } from 'vue-router'

import { useSurveyStore, useUserStore } from '@/store'
import { isLogin } from '@/utils/auth'

export default function setupUserLoginInfoGuard(router: Router) {
    router.beforeEach(async (to) => {
        if (!to.meta.requiresAuth) {
            return
        }

        if (
            // 如果用户没有登录
            !isLogin() ||
            // 或者用户登录凭据已经过期
            !(await useUserStore().isTokenExpired())
        ) {
            // 则将用户重定向到登录页面
            return { name: 'login' }
        }

        // 鉴权成功，获取初识数据，比如当前用户的所有问卷
        // TODO 目前刷新有点频繁。
        useSurveyStore().getAllSurveys()
    })
}
