// @ts-nocheck

// export default [

//     // 用户登录
//     {
//         url: '/user/login',
//         method: 'POST',
//         response: (req: Req<LoginData>) => {
//             console.log(req)
//             return {
//                 code: 20000,
//                 success: true,
//                 message: '请求成功。',
//                 data: <Token>{
//                     accessToken: "123safsfw35345241223"
//                 }
//             }
//         }
//     }
// ]

export default [
    {
        url: '/user/login',
        method: 'post',
        rawResponse: async (req, res) => {
            let reqbody = ''
            await new Promise((resolve) => {
                req.on('data', (chunk) => {
                    reqbody += chunk
                })
                req.on('end', () => resolve(undefined))
            })
            res.setHeader('Content-Type', 'text/plain')
            res.statusCode = 200
            res.end(`hello, ${reqbody}`)
        },
    },
]
