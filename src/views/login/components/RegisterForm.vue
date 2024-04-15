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
            <el-button type="primary" @click="onSubmit">
                {{ $t('login.form.register') }}
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formRegister = reactive({
    username: '',
    password: '',
    passwordAgain: '',
})

function onSubmit() {}
</script>

<style scoped lang="scss"></style>
