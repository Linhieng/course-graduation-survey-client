import type { RouteRecordNormalized } from 'vue-router'

// 该函数使用了ES模块的静态导入语法，通过import.meta.glob来动态导入./modules文件夹下所有以.ts为后缀的文件，
// 并返回一个包含所有导入模块的异步Promise对象。其中，eager: true表示采用急切加载方式，即在模块加载时立即执行导入的模块。
const modules = import.meta.glob('./modules/*.ts', { eager: true })
// const externalModules = import.meta.glob('./externalModules/*.ts', {
//     eager: true,
// })

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
    Object.keys(_modules).forEach((key) => {
        const defaultModule = _modules[key].default
        if (!defaultModule) return
        const moduleList = Array.isArray(defaultModule)
            ? [...defaultModule]
            : [defaultModule]
        result.push(...moduleList)
    })
    return result
}

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, [])

// export const appExternalRoutes: RouteRecordNormalized[] = formatModules(
//     externalModules,
//     [],
// )
