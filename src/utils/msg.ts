import i18n from '@/locale';
import { Message, Notification } from '@arco-design/web-vue';

const { t } = i18n.global;

/**
 * 什么情况下使用 msg：
 *      - 由用户行为而触发的提示
 *      - 通常可以多次重复出现
 *      - 比如提示密码不能为空等信息
 */

export const msg = (message: string, position: 'top' | 'bottom' = 'top') => {
    Message.normal({
        id: message,
        content: t(message),
        closable: true,
        position,
    });
};
export const msgSuccess = (message: string, position: 'top' | 'bottom' = 'top') => {
    Message.success({
        id: message,
        content: t(message),
        closable: true,
        position,
    });
};
export const msgWarning = (message: string, position: 'top' | 'bottom' = 'top') => {
    Message.warning({
        id: message,
        content: t(message),
        closable: true,
        position,
    });
};
export const msgInfo = (message: string, position: 'top' | 'bottom' = 'top') => {
    Message.info({
        id: message,
        content: t(message),
        closable: true,
        position,
    });
};
export const msgError = (message: string, position: 'top' | 'bottom' = 'top') => {
    Message.error({
        id: message,
        content: t(message),
        closable: true,
        position,
    });
};
export const msgLoading = (message: string, position: 'top' | 'bottom' = 'top') => {
    Message.loading({
        id: message,
        content: t(message),
        closable: true,
        position,
    });
};

/**
 * 什么时候使用 notice？
 *      - 不是由用户行为触发的通知
 *      - 不会短时间内多次重复出现的通知
 */

export const notice = (message: string) => {
    Notification.info({
        id: message,
        content: t(message),
        showIcon: false,
        closable: true,
    });
};
export const noticeSuccess = (message: string) => {
    Notification.success({
        id: message,
        content: t(message),
        closable: true,
    });
};
export const noticeWarning = (message: string) => {
    Notification.warning({
        id: message,
        content: t(message),
        closable: true,
    });
};
export const noticeInfo = (message: string) => {
    Notification.info({
        id: message,
        content: t(message),
        closable: true,
    });
};
export const noticeError = (message: string) => {
    Notification.error({
        id: message,
        content: t(message),
        closable: true,
    });
};
