<script setup lang="ts">
import { apiNewSurvey } from '@/api/survey'
import { msgError } from '@/utils'

const emit = defineEmits<{
    (e: 'create', id: number): void
}>()

const createOne = async () => {
    const data = await apiNewSurvey()
    if (!data.ok) {
        msgError('view.survey.crate.wrong')
        return
    }
    emit('create', data.data.surveyId)
}
</script>

<template>
    <div>
        <h1>选择问卷</h1>
        <el-button @click="createOne">创建一份普通调查问卷</el-button>
    </div>
</template>
