import Mock from 'mockjs'
import setupMock from './util'

setupMock({
    setup() {
        // 登录，这里会拦截 /user/login 请求，然后直接返回结果。注意被拦截的请求将不会出现在 devtool 中的 network 中
        Mock.mock(new RegExp('/user/login'), () => {
            return {
                code: 0,
                status: 'succeed',
                msg: '请求成功',
                data: {
                    id: 1,
                    username: 'Alan'
                }
            }
        })
    },
})
