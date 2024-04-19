<script setup lang="ts">
import PreviewComp from '@/views/answer/index.vue'
import { useSurveyStore } from '@/store'
import { copyLink } from '@/utils/survey'
import type { OneSurvey } from '@/types'
import { ref } from 'vue'

const surveyStore = useSurveyStore()
const showPreview = ref(false)
const previewSurveyId = ref()

surveyStore.getAllSurveys()

const stopSurvey = (survey: OneSurvey) => {
    // surveyStore.stopSurvey(survey)
}
const previewSurvey = (survey: OneSurvey) => {
    previewSurveyId.value = survey.id
    showPreview.value = true
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
                        <div class="btns">
                            <el-button class="btn" @click="stopSurvey(row)">{{
                                $t('view.survey.publish.stop')
                            }}</el-button>
                            <el-button
                                class="btn"
                                @click="previewSurvey(row)"
                                >{{
                                    $t('view.survey.publish.preview')
                                }}</el-button
                            >
                            <el-button class="btn" @click="copyLink(row)">{{
                                $t('view.survey.publish.copy-link')
                            }}</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog v-model="showPreview" width="100%">
            <PreviewComp :id="previewSurveyId" :isReadonly="true" />
        </el-dialog>
    </template>
</template>

<style scoped lang="scss">
@mixin wb600 {
    @media screen and (max-width: 600px) {
        @content;
    }
}

.btns {
    display: flex;
    overflow: auto;

    @include wb600 {
        flex-direction: column;
    }
    .btn {
        margin: 4px;
    }
}
</style>
