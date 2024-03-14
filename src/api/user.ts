import type { ResProLogin, ResProSignup } from "@/types"
import {get, post} from '.'

const urlUserAuthExpired = '/user/isAuthExpired'
const urlLogin = '/user/login'
const urlSignup = '/user/signup'

export function apiIsExpired(data: any) {
    return get(urlUserAuthExpired, {data})
}

export function apiLogin(data: ReqUserLogin): ResProLogin {
    return post(urlLogin, { data })
}
export function apiSignup(data: ReqUserSignup): ResProSignup {
    return post(urlSignup, { data })
}
