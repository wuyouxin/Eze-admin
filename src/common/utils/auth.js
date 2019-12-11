import { sessionStorage } from 'js-storage'

const TOKEN_KEY = 'eze_token'

export const getToken = () => sessionStorage.get(TOKEN_KEY)

export const setToken = (token) => sessionStorage.set(TOKEN_KEY, token)

export const removeToken = () => sessionStorage.remove(TOKEN_KEY)

