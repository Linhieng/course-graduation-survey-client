import { defineStore } from 'pinia';
import { Notification } from '@arco-design/web-vue';
import type { NotificationReturn } from '@arco-design/web-vue/es/notification/interface';
import type { RouteRecordNormalized } from 'vue-router';
import { getMenuList } from '@/api/user';
import type { AppState, DeviceType } from './types';
import useUserStore from '../user';

// 为什么使用 localStorage 就会导致递归报错？这是什么原因？写在 state 里面就没事了
// const lastRouter = JSON.parse(localStorage.getItem('lastRouter')) || [];
const useAppStore = defineStore('app', {
    state: (): AppState => ({
        theme: 'light',
        colorWeak: false,
        navbar: true,
        menu: true,
        topMenu: false,
        hideMenu: false,
        menuCollapse: false,
        footer: true,
        themeColor: '#165DFF',
        menuWidth: 220,
        globalSettings: false,
        device: 'desktop',
        tabBar: true,
        menuFromServer: false,
        serverMenu: [],
        //
        focusMode: false,
        // 这里如果使用 useLocalStore，会死递归报错
        lastRouter: JSON.parse(localStorage.getItem('lastRouter') || '[]'),
    }),

    getters: {
        appCurrentSetting(state: AppState): AppState {
            return { ...state };
        },
        appDevice(state: AppState) {
            return state.device;
        },
        appAsyncMenus(state: AppState): RouteRecordNormalized[] {
            return state.serverMenu as unknown as RouteRecordNormalized[];
        },
    },

    actions: {
        /** 更新最近访问的路由 */
        updateLastRouter(name: string, text: string, icon: any) {
            if (name === 'Workplace') return;
            if (name === 'login') return;
            if (name === 'collect-table') return;
            if (name === 'Create') return;
            if (name === 'Redirect') return;
            const had = this.$state.lastRouter.some((v, i, arr) => {
                if (v.name === name) {
                    arr[i].count++;
                    return true;
                }
                return false;
            });
            if (!had) {
                this.$state.lastRouter.sort((a, b) => b.count - a.count);
                this.$state.lastRouter.splice(5);
                this.$state.lastRouter.push({
                    name,
                    count: 0,
                    text,
                    icon,
                });
            }
            localStorage.setItem('lastRouter', JSON.stringify(this.$state.lastRouter));

            const userId = useUserStore().accountId;
            if (userId) {
                const rawAllLastRouter = localStorage.getItem('all-last-router');
                const allLastRouter = JSON.parse(rawAllLastRouter || '{}');
                allLastRouter[userId] = this.$state.lastRouter;
                localStorage.setItem('all-last-router', JSON.stringify(allLastRouter));
            }
        },

        // Update app settings
        updateSettings(partial: Partial<AppState>) {
            // @ts-ignore-next-line
            this.$patch(partial);
        },

        // Change theme color
        toggleTheme(dark: boolean) {
            if (dark) {
                this.theme = 'dark';
                document.body.setAttribute('arco-theme', 'dark');
            } else {
                this.theme = 'light';
                document.body.removeAttribute('arco-theme');
            }
        },
        toggleDevice(device: DeviceType) {
            this.device = device;
        },
        toggleMenu(value: boolean) {
            this.hideMenu = value;
        },
        async fetchServerMenuConfig() {
            let notifyInstance: NotificationReturn | null = null;
            try {
                notifyInstance = Notification.info({
                    id: 'menuNotice', // Keep the instance id the same
                    content: 'loading',
                    closable: true,
                });
                const { data } = await getMenuList();
                this.serverMenu = data;
                notifyInstance = Notification.success({
                    id: 'menuNotice',
                    content: 'success',
                    closable: true,
                });
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                notifyInstance = Notification.error({
                    id: 'menuNotice',
                    content: 'error',
                    closable: true,
                });
            }
        },
        clearServerMenu() {
            this.serverMenu = [];
        },
    },
});

export default useAppStore;
