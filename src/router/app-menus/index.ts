import { appRoutes } from '../routes'

const appClientMenus = appRoutes.map((el) => {
    const { name, path, meta, redirect, children } = el
    return {
        name,
        path,
        meta,
        redirect,
        children,
    }
})
appClientMenus.sort((a, b) => {
    return (a.meta.order || 0) - (b.meta.order || 0)
})

export default appClientMenus
