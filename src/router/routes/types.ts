import { defineComponent } from 'vue';
import type { RouteMeta, NavigationGuard } from 'vue-router';

export type Component<T = any> =
    | ReturnType<typeof defineComponent>
    // | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);

export interface AppRouteRecordRaw {
    path: string;
    name?: string | symbol;
    /** 具体类型在 typing.d.ts 中可见 */
    meta?: RouteMeta;
    redirect?: string | { name: string };
    component: Component | string;
    children?: AppRouteRecordRaw[];
    alias?: string | string[];
    props?: Record<string, any> | boolean;
    beforeEnter?: NavigationGuard | NavigationGuard[];
    fullPath?: string;
}
