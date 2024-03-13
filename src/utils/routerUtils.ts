import { type RouteLocationRaw, type Router } from "vue-router"

export function windowLocation(method: 'replace' | 'assign', hash: string) {
    window.location[method](hash)
}

export function routerReplace(router: Router, to: RouteLocationRaw) {
    router.replace(to)
}
