<script setup lang="ts">
import { useSurveyStore } from '@/store'
import type { OneSurvey } from '@/types'

const surveyStore = useSurveyStore()

surveyStore.getAllSurveys()

const publishSurvey = (survey: OneSurvey) => {
    // surveyStore.publishSurvey(survey)
}
</script>
<template>
    <h1>{{ $t('view.survey.stop.title') }}</h1>
    <template v-if="surveyStore.$state.allSurvey.isFetch">
        <MyLoading />
    </template>
    <template v-else-if="surveyStore.$state.allSurvey.stop.length < 1">
        <el-empty :description="$t('view.survey.stop.empty')" />
    </template>
    <template v-else>
        <div class="container">
            <el-table :data="surveyStore.$state.allSurvey.stop" height="600">
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
                        <el-button @click="publishSurvey(row)">继续</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </template>
</template>
