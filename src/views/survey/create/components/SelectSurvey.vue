<script setup lang="ts">
import { apiNewSurvey } from '@/api/survey'
import { useSurveyStore } from '@/store'
import { msgError } from '@/utils'

const createOne = async () => {
    useSurveyStore().createNewSurvey()
}
</script>

<template>
    <div>
        <h1>选择问卷</h1>
        <el-button @click="createOne">创建一份普通调查问卷</el-button>
    </div>
</template>
