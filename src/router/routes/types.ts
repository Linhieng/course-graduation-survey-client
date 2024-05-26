import { defineComponent } from 'vue';
import type { RouteMeta, NavigationGuard } from 'vue-router';

export type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);

export interface AppRouteRecordRaw {
    path: string;
    name?: string | symbol;
    /**
     * meta 中属性说明
     * - isExternal: 是否是外部链接，为 true 时会显示一个外部链接图标
     * - locale: 标题，i18n
     * - icon: 图标名称
     * - requiresAuth: 是否需要登录才能访问
     * - order: 在 menu 中的顺序，从小到大排序
     * - hideInMenu: 是否在菜单中隐藏
     * - roles: 允许访问的角色，设置为 ['*'] 表示所有用户访问 ,
     */
    meta?: RouteMeta;
    redirect?: string;
    component: Component | string;
    children?: AppRouteRecordRaw[];
    alias?: string | string[];
    props?: Record<string, any>;
    beforeEnter?: NavigationGuard | NavigationGuard[];
    fullPath?: string;
}
