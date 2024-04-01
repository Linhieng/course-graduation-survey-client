<script setup lang="ts">

import { apiGetAllSurveys, apiToggleSurveyDelete, apiToggleSurveyValid } from '@/api'
import { STATUS_SUCCEED } from '@/constants'
import { onMounted, ref } from 'vue'
import type { OneSurvey } from '@/types'
import { msgSuccess, msgWarning } from '@/utils'
import { useRouter } from 'vue-router'

const allSurveys = ref<OneSurvey[]>()
const showSurveys = ref<OneSurvey[]>()
const router = useRouter()

onMounted(async () => {
    const resData = await apiGetAllSurveys()
    if (resData.status === STATUS_SUCCEED) {
        allSurveys.value = resData.data.all_surveys
        showSurveys.value = allSurveys.value
    }
})

const toChangeSurvey = (survey: OneSurvey) => {
    if (!survey.is_draft) {
        msgWarning('已发布的问卷不允许修改，请重新创建')
        return
    }
    router.push({
        name: 'create',
        params: { id: survey.id }
    })

}

const copy = (txt: string) => {
    const input = document.createElement('input')
    input.value = txt
    document.body.appendChild(input)
    input.select()
    document.execCommand('Copy')
    input.remove()
}

const copyLink = (survey: OneSurvey) => {
    const link = `http://localhost:5173/answer/${survey.id}`
    copy(link)
    msgSuccess(`已复制： ${link}`)
}

const deleteSurvey = (survey: OneSurvey) => {
    apiToggleSurveyDelete(survey.id, true)
}

const toggleSurveyValid = (survey: OneSurvey) => {
    apiToggleSurveyValid(survey.id)
}

const toStatAnswer = (survey: OneSurvey) => {
    router.push({
        name: 'stat',
        params: {
            surveyId: survey.id
        }
    })
}
</script>

<template>
    <div class="surveys-container">
        <div v-for="survey of showSurveys" class="surveys-item" :key="survey.id"
            :class="{ is_draft: survey.is_draft }">
            <div class="base-info">
                <p>标题：{{ survey.title }}</p>
                <p><el-text truncated>
                        备注：{{ survey.comment }}
                    </el-text></p>
                <p>创建时间：{{ new Date(survey.created_at).toLocaleString() }}</p>
                <p>更新时间：{{ new Date(survey.updated_at).toLocaleString() }}</p>
            </div>
            <div class="btn-options">
                <p class="btn-option flex-all-center" @click="() => { toChangeSurvey(survey) }">修改问卷内容</p>
                <p class="btn-option flex-all-center" @click="() => { deleteSurvey(survey) }">
                    {{ survey.is_deleted ? '从回收站中恢复' : '移入回收站' }}
                </p>
                <p class="btn-option flex-all-center" @click="() => { toStatAnswer(survey) }">统计数据</p>
                <p class="btn-option flex-all-center" @click="() => { toggleSurveyValid(survey) }">
                    {{ survey.is_valid ? '停止收集' : '发布问卷' }}
                </p>
                <p class="btn-option flex-all-center" @click="() => { copyLink(survey) }">复制问卷链接</p>
            </div>
        </div>
        <div v-if="showSurveys && showSurveys.length < 1">
            <el-empty description="您还没有创建过问卷" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.top-filter {
    width: 100%;
    overflow: auto;
}

.surveys-container {
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .surveys-item {
        max-width: 350px;
        padding: 20px;
        box-shadow: 0 0 10px 0 #eee;
        margin: 10px;
    }

}

.base-info {
    display: flex;
    flex-direction: column;

    &>p {
        margin-bottom: 10px;
        font-size: 1.1rem;
        color: black;

        span {
            font-size: inherit;
            color: inherit;
        }
    }
}

.btn-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .btn-option {
        flex: 1 1 auto;
        min-width: max-content;
        padding: 20px;
        margin: 4px;
        text-decoration: underline;
        cursor: pointer;

        &:hover {
            box-shadow: 0 0 4px #ddd;
        }
    }
}
</style>
