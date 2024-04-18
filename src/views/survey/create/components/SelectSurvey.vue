<script setup lang="ts">
import { useSurveyStore } from '@/store'

const createOne = async () => {
    useSurveyStore().createNewSurvey()
}
</script>

<template>
    <div>
        <h1>{{ $t('view.survey.create.step.select') }}</h1>
        <el-button @click="createOne">{{
            $t('view.survey.create.create-normal-survey')
        }}</el-button>
    </div>
</template>
