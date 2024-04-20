import type { RouteRecordNormalized } from 'vue-router';

export interface AppState {
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
