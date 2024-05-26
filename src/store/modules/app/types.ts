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

    /** 主题：暗色或亮色 */
    theme: 'light' | 'dark';
    /** 色弱模式 */
    colorWeak: boolean;
    /** 控制是否显示底部 */
    footer: boolean;
    /** 主题色 */
    themeColor: string;
    /** 控制是否显示配置面板 */
    globalSettings: boolean;
    /** 是否显示顶部。总感觉这个单词不合适，看到 navbar 我总会认为是菜单页，但这里它却表示页面的顶部 */
    navbar: boolean;
    /** 控制是否显示顶部标签页lb顶部标签列表 */
    tabBar: boolean;
    /** TODO: 这个应该已经没用了，因为我把 v-if 全部换成了 v-show。
     * 而且这个配置原本的作用我不太懂，主要是有个 menu 的配置项太多了
     */
    menu: boolean;
    /** 控制是否将侧边栏菜单显示在顶部 */
    topMenu: boolean;
    /** 控制是否隐藏侧边栏。当隐藏侧边栏时，会将侧边栏放到抽屉中，用户可以在顶部点击按钮打开抽屉 */
    hideMenu: boolean;
    /** 控制侧边栏菜单是否收缩 */
    menuCollapse: boolean;
    /** 侧边栏的宽度 */
    menuWidth: number;
    /**
     * TODO: 这里是根据页面宽度是否大于 lg(992px) 来判断是否设备类型。
     * 但实际上该页面并没有适配移动端。
     * lg 的值来自 https://arco.design/vue/component/grid#responsivevalue
     */
    device: DeviceType;
    /** 控制菜单数据是否从服务端获取 */
    menuFromServer: boolean;
    /** 服务端返回的具体菜单数据 */
    serverMenu: RouteRecordNormalized[];
    [key: string]: unknown;
}
export type DeviceType = 'mobile' | 'desktop';
