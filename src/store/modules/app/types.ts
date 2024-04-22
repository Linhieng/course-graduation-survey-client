import type { RouteRecordNormalized } from 'vue-router';

export interface AppState {
    /** 最近访问的路由 */
    lastRouter: Array<{
        /** 路由名称 */
        name: string;
        /** 访问次数 */
        count: number;
        /** 展示名称 */
        text: string;
        /** 展示图标，TODO 怎么说？ */
        icon: any;
    }>;
    /** 创建问卷时的聚焦、专注模式 */
    focusMode: boolean;

    theme: string;
    colorWeak: boolean;
    navbar: boolean;
    menu: boolean;
    topMenu: boolean;
    hideMenu: boolean;
    menuCollapse: boolean;
    footer: boolean;
    themeColor: string;
    menuWidth: number;
    globalSettings: boolean;
    device: string;
    tabBar: boolean;
    menuFromServer: boolean;
    serverMenu: RouteRecordNormalized[];
    [key: string]: unknown;
}
