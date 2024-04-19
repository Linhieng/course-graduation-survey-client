<script setup lang="ts">
import { useSurveyStore } from '@/store'
import type { OneSurvey } from '@/types'

const surveyStore = useSurveyStore()

surveyStore.getAllSurveys()

const stopSurvey = (survey: OneSurvey) => {
    // surveyStore.stopSurvey(survey)
}
const previewSurvey = (survey: OneSurvey) => {}
const copyLink = (survey: OneSurvey) => {
    surveyStore.copyLink(survey)
}
</script>
<template>
    <h1>{{ $t('view.survey.publish.title') }}</h1>
    <template v-if="surveyStore.$state.allSurvey.isFetch">
        <MyLoading />
    </template>
    <template v-else-if="surveyStore.$state.allSurvey.publish.length < 1">
        <el-empty :description="$t('view.survey.publish.empty')" />
    </template>
    <template v-else>
        <div class="container">
            <el-table :data="surveyStore.$state.allSurvey.publish" height="600">
                <el-table-column
                    prop="title"
                    :label="$t('view.survey.item.title')"
                    width="100"
                />
                <el-table-column
                    prop="updated_at"
                    width="104"
                    sortable
                    :label="$t('view.survey.item.updated_at')"
                >
                    <template #="{ row }">
                        {{ new Date(row.updated_at).toLocaleDateString() }}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('view.survey.item.option')"
                    width="120"
                >
                    <template #="{ row }">
                        <el-button @click="stopSurvey(row)">{{
                            $t('view.survey.publish.stop')
                        }}</el-button>
                        <el-button @click="previewSurvey(row)">{{
                            $t('view.survey.publish.preview')
                        }}</el-button>
                        <el-button @click="copyLink(row)">{{
                            $t('view.survey.publish.copy-link')
                        }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </template>
</template>
