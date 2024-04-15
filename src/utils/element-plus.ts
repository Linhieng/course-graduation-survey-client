/**
 * @file element-plus 封装一些 element-plus 中的常用函数
 */

import { ElMessage, ElNotification } from 'element-plus'
import i18n from '@/locale'
const { t } = i18n.global

/**
 * 什么情况下使用 msg：
 *      - 由用户行为而触发的提示
 *      - 通常可以多次重复出现
 *      - 比如提示密码不能为空等信息
 */

export const msg = (message: string) => {
    ElMessage({ showClose: true, grouping: true, message: t(message) })
}
export const msgSuccess = (message: string) => {
    ElMessage({
        showClose: true,
        grouping: true,
        message: t(message),
        type: 'success',
    })
}
export const msgWarning = (message: string) => {
    ElMessage({
        showClose: true,
        grouping: true,
        message: t(message),
        type: 'warning',
    })
}
export const msgInfo = (message: string) => {
    ElMessage({
        showClose: true,
        grouping: true,
        message: t(message),
        type: 'info',
    })
}
export const msgError = (message: string) => {
    ElMessage({
        showClose: true,
        grouping: true,
        message: t(message),
        type: 'error',
    })
}

/**
 * 什么时候使用 notice？
 *      - 不是由用户行为触发的通知
 *      - 不会短时间内多次重复出现的通知
 */

export const notice = (message: string, title = '', duration = 3000) => {
    ElNotification({ title, message: t(message), duration })
}
export const noticeSuccess = (
    message: string,
    title = 'Success',
    duration = 3000,
) => {
    ElNotification({ title, message: t(message), type: 'success', duration })
}
export const noticeWarning = (
    message: string,
    title = 'Warning',
    duration = 3000,
) => {
    ElNotification({ title, message: t(message), type: 'warning', duration })
}
export const noticeInfo = (
    message: string,
    title = 'Info',
    duration = 3000,
) => {
    ElNotification({ title, message: t(message), type: 'info', duration })
}
export const noticeError = (
    message: string,
    title = 'Error',
    duration = 3000,
) => {
    ElNotification({ title, message: t(message), type: 'error', duration })
}
