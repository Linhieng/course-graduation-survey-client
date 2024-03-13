import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ResLoginData, StoreUser } from '@/types'
import { fillObject, resetObject } from '@/utils'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/localStorage'
import { LOCAL_STORAGE_USER } from '@/constants'

export const useStoreUser = defineStore('storeUser', () => {
    const ache = getLocalStorage<StoreUser>(LOCAL_STORAGE_USER)

    const user = ref<StoreUser>({
        id: ache.id ?? '',
        username: ache.username ?? '',
        isLogin: ache.isLogin ?? false,
        // token: '',
        // avatar: '',
    })

    const isLogin = computed(() => user.value.isLogin)

    function loginUser (u: ResLoginData) {
        fillObject(user.value, u)
        user.value.isLogin = true
        setLocalStorage(LOCAL_STORAGE_USER, user.value)
    }
    function logoutUser () {
        resetObject(user.value, user.value, '', {
            isLogin: false
        })
        removeLocalStorage(LOCAL_STORAGE_USER)
    }


    return {
        // state
        user,
        // getters
        isLogin,
        // actions
        loginUser,
        logoutUser
    }
})
