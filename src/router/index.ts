import { createRouter, createWebHistory } from 'vue-router'
// import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

import { appRoutes } from './routes'
import { REDIRECT_MAIN, NOT_FOUND_ROUTE } from './routes/base'
// import createRouteGuard from './guard'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// TODO 如何为 name 获取类型提示？我指的是可以直接获取具体值，就像 pinia 中的 name 那样！
// 当有了 ts 后，对于常量，专门提供一个变量真的合适吗？
// 使用 ts 的目的是为了方便开发，但如果每一个字符串都需要一个变量，这不是很麻烦吗？
// 明明可以直接通过类型提示获取到 字符串，为啥还要用变量？
// 使用变量的唯一好处就是，当你要修改的时候，只需要修改一个地方。但实际上，要修改的次数并不多
// 反而是使用的次数很多！
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: 'login',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/index.vue'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '/answer/:id',
            props: true,
            name: 'answer',
            component: () => import('@/views/answer/index.vue'),
            meta: {
                requiresAuth: false,
            },
        },
        ...appRoutes,
        REDIRECT_MAIN,
        NOT_FOUND_ROUTE,
    ],
    // scrollBehavior() {
    // 回退页面时滚动到顶部
    //     return { top: 0 }
    // },
})

// createRouteGuard(router)

export default router
