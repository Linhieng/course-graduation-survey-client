import { defineStore } from 'pinia';
import {
    login as userLogin,
    logout as userLogout,
    getUserInfo,
    LoginData,
    updateUserInfo as apiUpdateUserInfo,
    UserInfoCanModified,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';
import { msgError, msgSuccess } from '@/utils/msg';

const useUserStore = defineStore('user', {
    state: (): UserState => ({
        name: undefined,
        avatar: undefined,
        job: undefined,
        organization: undefined,
        location: undefined,
        email: undefined,
        introduction: undefined,
        personalWebsite: undefined,
        jobName: undefined,
        organizationName: undefined,
        locationName: undefined,
        phone: undefined,
        registrationDate: undefined,
        accountId: undefined,
        certification: undefined,
        role: '',
    }),

    getters: {
        userInfo(state: UserState): UserState {
            return { ...state };
        },
    },

    actions: {
        /** 更新用户信息 */
        async updateUserInfo(data: Partial<UserInfoCanModified>) {
            const res = await apiUpdateUserInfo(data);
            if (res.ok) {
                msgSuccess('更新成功');
                this.info();
            } else {
                msgError(res.msg);
            }
        },
        switchRoles() {
            return new Promise((resolve) => {
                this.role = this.role === 'user' ? 'admin' : 'user';
                resolve(this.role);
            });
        },
        // Set user's information
        setInfo(partial: Partial<UserState>) {
            this.$patch(partial);
        },

        // Reset user's information
        resetInfo() {
            this.$reset();
        },

        // Get user's information
        async info() {
            const res = await getUserInfo();

            if (!res.ok) {
                throw new Error(res.msg);
            }

            this.setInfo(res.data);
        },

        // Login
        async login(loginForm: LoginData) {
            const res = await userLogin(loginForm);
            if (res.ok) {
                setToken(res.data.token);
                return true;
            } else {
                clearToken();
                return false;
            }
        },
        logoutCallBack() {
            const appStore = useAppStore();
            this.resetInfo();
            clearToken();
            removeRouteListener();
            appStore.clearServerMenu();
        },
        // Logout
        async logout() {
            try {
                await userLogout();
            } finally {
                this.logoutCallBack();
            }
        },
    },
});

export default useUserStore;
