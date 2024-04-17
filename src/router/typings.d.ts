import 'vue-router'

declare module 'vue-router' {
    interface _RouteRecordBase {
        meta: RouteMeta
    }
    // TODO，似乎只能给 RouteMeta 添加类型，无法给 _RouteRecordBase 添加 meta 必选
    // 的类型声明
    interface RouteMeta {
        /** 必选。是否需要登录才能访问当前页面 */
        requiresAuth: boolean
        /** 必选。显示的标题，使用 locale 表示 */
        locale: string

        /** 组件，显示在 sidebar 中 */
        icon?: any
        /** 在 sidebar 中显示的优先级，默认是 0。数值越大，越靠后（升序） */
        order?: number
    }
}
