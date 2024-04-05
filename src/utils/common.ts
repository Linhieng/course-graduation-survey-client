import { unref } from 'vue'

export const copyToClipboard = (txt: string) => {
    const input = document.createElement('input')
    input.value = txt
    document.body.appendChild(input)
    input.select()
    document.execCommand('Copy')
    input.remove()
}

/**
 * 解套多层 ref
 * @param obj
 * @returns
 */
export const unrefRecursion = (obj: any): any => {
    obj = unref(obj)
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }

    const newObj: any = Array.isArray(obj) ? [] : {}

    for (const [key, value] of Object.entries(obj)) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = unrefRecursion(value)
        }
    }

    return newObj
}

/**
 * 获取文件内容
 *
 * @param blob
 * @returns
 */
export const readFileContent = (blob: Blob | File) => {
    const content = new Response(blob).text()
    return content
}

/**
 * 下载文件
 * @param strContent 文件内容字符串
 * @param filename 文件名称，带后缀名
 */
export const saveFile = (strContent: string, filename: string) => {
    const blob = new Blob([strContent], { type: 'text/plain' })
    const a = document.createElement('a')
    a.download = filename
    a.href = URL.createObjectURL(blob)
    a.addEventListener('click', (e) => {
        setTimeout(() => {
            URL.revokeObjectURL(a.href)
            a.remove()
        }, 3 * 1000)
    })
    a.click()
}

/**
 *
 * @returns 返回一个 UUID 字符串
 */
export function getUUID() {
    return Math.floor(Math.random() * 100_000_000)
        .toString()
        .slice(2)
}

/**
 * 根据模板 template 中所拥有的 keys，将 fillData 中对应的 keys 浅拷贝到 target 中
 * 如果忽略 fillData, 则 template 将作为 fillData
 * @param target
 * @param template
 * @param fillData
 */
export function fillObject(
    target: Record<string, any>,
    template: Record<string, any>,
    fillData?: Record<string, any>,
) {
    if (typeof fillData === 'object') {
        Object.keys(template).forEach((key) => {
            target[key] = fillData[key]
        })
    } else {
        Object.entries(template).forEach(([k, v]) => {
            target[k] = v
        })
    }
}

/**
 * 根据模板 template, 将 target 中的对应值重置为 defaultData
 * 某些特殊的 key 不想重置为 defaultData, 可以在 fillData 中指定
 * @param target
 * @param template
 * @param defaultData
 * @param fillData
 */
export function resetObject(
    target: Record<string, any>,
    template: Record<string, any>,
    defaultData: any,
    fillData: Record<string, any> = {},
) {
    Object.keys(template).forEach((key) => {
        if (key in fillData) {
            target[key] = fillData[key]
        } else {
            target[key] = defaultData
        }
    })
}
