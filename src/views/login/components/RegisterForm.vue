<template>
    <el-form label-width="auto" :model="formRegister" style="max-width: 600px">
        <el-form-item :label="$t('register.form.label.userName')">
            <el-input v-model="formRegister.username" />
        </el-form-item>
        <el-form-item :label="$t('register.form.label.password')">
            <el-input v-model="formRegister.password" type="password" />
        </el-form-item>
        <el-form-item :label="$t('register.form.label.passwordAgain')">
            <el-input v-model="formRegister.passwordAgain" type="password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="loading">
                {{ $t('login.form.register') }}
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store'
import { msgSuccess, msgWarning } from '@/utils'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const formRegister = reactive({
    username: '',
    password: '',
    passwordAgain: '',
})

async function onSubmit() {
    if (formRegister.password !== formRegister.passwordAgain) {
        msgWarning('register.form.warn.password-not-same')
        return
    }

    if (loading.value) return
    loading.value = true

    try {
        await userStore.register({
            username: formRegister.username,
            password: formRegister.password,
        })

        // router.push({
        //     name: 'login',
        // })
        msgSuccess('register.form.success')
    } catch (err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}
</script>

<style scoped lang="scss"></style>
