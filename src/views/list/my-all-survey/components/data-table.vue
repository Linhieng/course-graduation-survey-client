<script setup lang="ts">
import { ref } from 'vue';
import useSurveyListStore from '@/store/modules/survey-list';
import { stateToColor, surveyType_string } from '@/store/modules/survey-list/utils';
const surveyListStore = useSurveyListStore();

const optionPaneVisual = ref(false);

const changeOneSurvey = async () => {
    await surveyListStore.updateOneSurvey();
    surveyListStore.searchSurveyList();
    return true;
};

const onPageChange = (current: number) => {
    surveyListStore.state.searchPage.pageStart = current;
    surveyListStore.searchSurveyList();
};

const editSurvey = (survey: { id: number; title: string; comment: string }) => {
    optionPaneVisual.value = true;
    surveyListStore.state.updateData.surveyId = survey.id;
    surveyListStore.state.updateData.title = survey.title;
    surveyListStore.state.updateData.comment = survey.comment;
};
</script>

<template>
    <a-table
        :data="surveyListStore.state.searchResult.survey_list"
        :pagination="{
            total: surveyListStore.state.searchResult.total,
            current: surveyListStore.state.searchResult.pageStart,
            pageSize: surveyListStore.state.searchPage.pageSize,
            defaultCurrent: surveyListStore.state.searchPage.pageStart,
            showTotal: true,
        }"
        row-key="id"
        stripe
        table-layout-fixed
        :bordered="{ cell: true }"
        @page-change="onPageChange"
        :loading="surveyListStore.state.loading.searching"
    >
        <template #columns>
            <a-table-column :width="40" title="id" data-index="id" align="center"></a-table-column>
            <a-table-column :width="130" :title="$t('标题')" data-index="title" ellipsis tooltip></a-table-column>
            <a-table-column :width="70" :title="$t('状态')" align="center">
                <template #cell="{ record }">
                    <a-tag :color="stateToColor[record.status]">{{ $t(record.status) }}</a-tag>
                </template>
            </a-table-column>
            <a-table-column :width="80" :title="$t('模版类型')" align="center">
                <template #cell="{ record }">
                    <a-tag v-if="record.is_template === 0">{{ $t('非模版') }}</a-tag>
                    <a-tag v-else-if="record.is_template === 1" color="red">{{ $t('私有模版') }}</a-tag>
                    <a-tag v-else-if="record.is_template === 2" color="green">{{ $t('公开模版') }}</a-tag>
                </template>
            </a-table-column>
            <a-table-column :width="70" :title="$t('问卷类型')" data-index="survey_type" align="center">
                <template #cell="{ record }">
                    <a-tag>{{ surveyType_string[record.survey_type] }}</a-tag>
                </template>
            </a-table-column>
            <a-table-column
                :width="50"
                :title="$t('访问量')"
                data-index="collect_visited"
                align="center"
            ></a-table-column>
            <!-- prettier-ignore -->
            <a-table-column :width="60" :title="$t('回答数量')" data-index="collect_answer" align="center"> </a-table-column>
            <!-- prettier-ignore -->
            <a-table-column :width="70" :title="$t('创建时间')" data-index="created_at"> <template #cell="{record}">{{ new Date(record.created_at).toLocaleDateString() }}</template> </a-table-column>
            <!-- prettier-ignore -->
            <a-table-column :width="70" :title="$t('更新时间')" data-index="updated_at"> <template #cell="{record}">{{ new Date(record.updated_at).toLocaleDateString() }}</template> </a-table-column>
            <a-table-column :width="60" :title="$t('操作')" align="center">
                <template #cell="{ record }">
                    <a-button @click="editSurvey(record)">{{ $t('修改') }}</a-button>
                </template>
            </a-table-column>
        </template>
    </a-table>
    <a-modal
        v-model:visible="optionPaneVisual"
        @cancel="() => (optionPaneVisual = false)"
        :on-before-ok="changeOneSurvey"
    >
        <template #title>{{ $t('修改问题') }}</template>
        <a-form :model="surveyListStore.state.updateData" :style="{ width: '100%' }">
            <a-form-item :label="$t('问卷标题')" label-col-flex="max-content">
                <a-textarea auto-size v-model="surveyListStore.state.updateData.title"></a-textarea>
            </a-form-item>
            <a-form-item :label="$t('问卷描述')" label-col-flex="max-content">
                <a-textarea auto-size v-model="surveyListStore.state.updateData.comment"></a-textarea>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<style scoped lang="scss">
:deep(.arco-form-item-label-col.arco-form-item-label-col-flex) {
    flex: 0 0 max-content;
}
</style>
