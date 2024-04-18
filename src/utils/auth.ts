const TOKEN_KEY = 'token'

interface tokenObj {
    token: string
    userId: number
    username: string
}

const isLogin = () => {
    return !!localStorage.getItem(TOKEN_KEY)
}

const getToken = (): tokenObj => {
    try {
        const token = JSON.parse(localStorage.getItem(TOKEN_KEY))
        return token
    } catch (error) {
        // TODO ????
        return
    }
}

const setToken = (token: tokenObj) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export { isLogin, getToken, setToken, clearToken }
