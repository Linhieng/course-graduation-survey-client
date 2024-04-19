<template>
    <h1>
        {{ $t('view.survey.create.step.publish') }}
    </h1>
    <div class="container">
        <p>
            {{ $t('view.survey.create.publish-attention-info') }}
        </p>
        <div class="btns">
            <el-button class="btn" @click="preview">{{
                $t('view.survey.create.preview')
            }}</el-button>
            <el-button
                class="btn"
                @click="publish"
                :loading="surveyStore.$state.create.isFetch"
                >{{ $t('view.survey.create.step.publish') }}</el-button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSurveyStore } from '@/store'
import { msgSuccess } from '@/utils'
const surveyStore = useSurveyStore()
const preview = () => {}

const publish = () => {
    surveyStore.publishSurveyAfterEdit()
}
</script>

<style scoped lang="scss">
.container {
    padding: 20px;

    p {
        margin-bottom: 20px;
    }
    .btns {
        display: flex;
        .btn {
            flex: 1 0 auto;
            margin-right: 30px;
        }
    }
}
</style>
