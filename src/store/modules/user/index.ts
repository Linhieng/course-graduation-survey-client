import { defineStore } from 'pinia'
import type { LoginData } from '@/api/user'
import {
    isExpired as apiIsExpired,
    login as userLogin,
    logout as userLogout,
    // getUserInfo,
    // LoginData,
} from '@/api/user'
import { setToken, clearToken } from '@/utils/auth'
// import { removeRouteListener } from '@/utils/route-listener'
// import type { UserState } from './types'
import useAppStore from '../app'
import { useSurveyStore } from '../../index'

interface UserState {
    userId?: number
    username: string
}

const useUserStore = defineStore('user', {
    state: (): UserState => ({
        userId: undefined,
        username: '',
        // avatar: undefined,
        // job: undefined,
        // organization: undefined,
        // location: undefined,
        // email: undefined,
        // introduction: undefined,
        // personalWebsite: undefined,
        // jobName: undefined,
        // organizationName: undefined,
        // locationName: undefined,
        // phone: undefined,
        // registrationDate: undefined,
        // accountId: undefined,
        // certification: undefined,
        // role: '',
    }),

    getters: {
        userInfo(state: UserState): UserState {
            return { ...state }
        },
    },

    actions: {
        /** 校验用户的 token 是否已过期 */
        async isTokenExpired() {
            const res = await apiIsExpired()
            return res.ok
        },
        // switchRoles() {
        //     return new Promise((resolve) => {
        //         this.role = this.role === 'user' ? 'admin' : 'user'
        //         resolve(this.role)
        //     })
        // },
        // // Set user's information
        // setInfo(partial: Partial<UserState>) {
        //     this.$patch(partial)
        // },

        resetInfo() {
            this.$reset()
        },

        // // Get user's information
        // async info() {
        //     const res = await getUserInfo()

        //     this.setInfo(res.data)
        // },

        async login(loginForm: LoginData) {
            const res = await userLogin(loginForm)

            if (!res.ok) {
                clearToken()
                throw res
            }

            setToken(res.data)
            this.$state.username = res.data.username
            this.$state.userId = res.data.userId
            const { getAllSurveys } = useSurveyStore()
            getAllSurveys()
        },

        logoutCallBack() {
            // const appStore = useAppStore()
            this.resetInfo()
            clearToken()
            // removeRouteListener()
            // appStore.clearServerMenu()
        },
        // Logout
        async logout() {
            try {
                await userLogout()
            } finally {
                this.logoutCallBack()
            }
        },
    },
})

export default useUserStore
