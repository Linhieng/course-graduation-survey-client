/**
 * 节流：函数 fn 在调用后的的 duration 时间内不会再次执行
 * @param func
 * @param duration 单位 ms
 * @returns
 */
export function throttle<T extends (...args: any[]) => void>(
    func: T,
    duration = 500,
): (...args: Parameters<T>) => void {
    let timer: null | number = null
    return function (...args: Parameters<T>) {
        if (timer === null) {
            // @ts-ignore
            func.apply(this, args)
            // @ts-ignore
            timer = setTimeout(() => {
                timer = null
            }, duration)
        }
    }
}

/**
 * 防抖：
 *  每次调用函数，都会先取消掉之前调用的函数；
 *  每次调用函数时，都会延迟 delay 时间
 * @param func
 * @param delay 单位 ms
 * @returns 返回一个防抖函数
 */
export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay = 500,
): (...args: Parameters<T>) => void {
    let timer: number

    return function (...args: Parameters<T>) {
        clearTimeout(timer)
        // @ts-ignore
        timer = setTimeout(() => {
            // @ts-ignore
            func.apply(this, args)
        }, delay)
    }
}
