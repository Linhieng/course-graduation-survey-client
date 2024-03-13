/**
 * 不存在时返回空对象
 *
 * @param key
 * @returns
 */
export function getLocalStorage<T>(key: string): T | Record<string, undefined> {
    const value = window.localStorage.getItem(key)
    try {
        return JSON.parse(value || '{}')
    } catch (error) {
        return {}
    }
}

export function setLocalStorage(key: string, data: Object) {
    const value = JSON.stringify(data)
    window.localStorage.setItem(key, value)
}

export function removeLocalStorage(key: string) {
    window.localStorage.removeItem(key)
}
