import type { RouteRecordNormalized } from 'vue-router';

const modules = import.meta.glob('./modules/*.ts', { eager: true });
const externalModules = import.meta.glob('./externalModules/*.ts', {
    eager: true,
});

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
    Object.keys(_modules).forEach((key) => {
        const defaultModule = _modules[key].default;
        if (!defaultModule) return;
        const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule];

        if (moduleList[0].name === 'exception') return;
        if (moduleList[0].name === 'faq') return;
        if (moduleList[0].name === 'arcoWebsite') return;

        result.push(...moduleList);
    });
    return result;
}

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, []);

export const appExternalRoutes: RouteRecordNormalized[] = formatModules(externalModules, []);
