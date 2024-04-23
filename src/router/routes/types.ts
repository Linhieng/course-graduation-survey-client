import { defineComponent } from 'vue';
import type { RouteMeta, NavigationGuard } from 'vue-router';

export type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);

export interface AppRouteRecordRaw {
    path: string;
    name?: string | symbol;
    meta?: RouteMeta;
    redirect?: string;
    component: Component | string;
    children?: AppRouteRecordRaw[];
    alias?: string | string[];
    // 这里为啥是这个呀？明明也可以是 boolean
    props?: Record<string, any> | boolean;
    beforeEnter?: NavigationGuard | NavigationGuard[];
    fullPath?: string;
}
