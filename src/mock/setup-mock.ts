import type { HttpResponse } from '@/api'

const debug = import.meta.env.MODE !== 'production'

// 可以只通过一个简单的 debug 变量，来控制是否 mock
export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
    if (mock !== false && debug) setup()
}

export const successResponseWrap = (data: unknown): HttpResponse => {
    return {
        ok: true,
        data,
        status: 'succeed',
        msg: '请求成功',
        code: 20000,
    }
}

export const failResponseWrap = (
    data: unknown,
    msg: string,
    code = 50000,
): HttpResponse => {
    return {
        ok: false,
        data,
        status: 'failed',
        msg,
        code,
    }
}
