import { type RouteLocationRaw, type Router } from 'vue-router'

/**
 * 不要滥用 window.location!
 * 不然每次切换路由都会刷新，而每次刷新都将导致代码重新执行
 * 这意味着 storeUser 中的代码也会重新执行。
 * 由于 storeUser 在初始时，会对缓存中的 token 判断是否已过期
 * 一旦已过期，那么就会进行跳转，但跳转调用的却是 windlow.location
 * 这就导致一个死循环！页面就一直在刷新
 *
 * @param method
 * @param hash
 */
export function windowLocation(method: 'replace' | 'assign', hash: string) {
    window.location[method](hash)
}

export function routerReplace(router: Router, to: RouteLocationRaw) {
    router.replace(to)
}
