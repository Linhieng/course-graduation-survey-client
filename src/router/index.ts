import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'
import NotFound from '@/views/404/NotFund.vue'
import FillAnswer from '@/views/answer/FillAnswer.vue'
import { useStoreUser } from '@/stores'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { requiresAuth: false },
        },
        {
            path: '/create',
            name: 'create',
            component: () => import('../views/create/CreateView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/stat',
            name: 'stat',
            component: () => import('../views/stat/StatView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/answer/:id',
            name: 'statanswer',
            component: FillAnswer,
            props: true,
            meta: { requiresAuth: false },
        },
        // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound,
            meta: { requiresAuth: false },
        },
    ]
})

router.beforeEach(async (to, from) => {
    // const isLogin = useStoreUser().isLogin
    // if (
    //     // 如果进入页面要求登录
    //     to.meta.requiresAuth &&
    //     // 而且用户没有登录
    //     !isLogin &&
    //     // 同时不是去往 login
    //     to.name !== 'login' // ❗️ 避免无限重定向
    //     // 的话，直接跳转到 login 让用户登录
    // ) {
    //     // 将用户重定向到登录页面
    //     return { name: 'login' }
    // }
})

export default router
