import type { ResProLogin, ResProSignup } from "@/types"
import {post} from '.'

const urlLogin = '/user/login'
const urlSignup = '/user/signup'

export function apiLogin(data: ReqUserLogin): ResProLogin {
    return post(urlLogin, { data })
}
export function apiSignup(data: ReqUserSignup): ResProSignup {
    return post(urlSignup, { data })
}
