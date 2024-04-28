<script setup lang="ts">
import { ref } from 'vue';
import useSurveyListStore from '@/store/modules/survey-list';
import { stateToColor, surveyType_string } from '@/store/modules/survey-list/utils';
const surveyListStore = useSurveyListStore();

const optionPaneVisual = ref(false);

const changeOneSurvey = async () => {};
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
    >
        <template #columns>
            <a-table-column :width="40" title="id" data-index="id"></a-table-column>
            <a-table-column :width="100" title="标题" data-index="title" ellipsis></a-table-column>
            <a-table-column :width="100" title="描述" data-index="comment" ellipsis>
                <template #cell="{ record }">
                    <a-tooltip :content="record.comment">
                        {{ record.comment }}
                    </a-tooltip>
                </template>
            </a-table-column>
            <a-table-column :width="100" title="状态">
                <template #cell="{ record }">
                    <a-tag :color="stateToColor[record.status]">{{ $t(record.status) }}</a-tag>
                </template>
            </a-table-column>
            <a-table-column :width="100" title="模版类型">
                <template #cell="{ record }">
                    <a-tag v-if="record.is_template === 0">{{ $t('非模版') }}</a-tag>
                    <a-tag v-else-if="record.is_template === 1" color="red">{{ $t('私有模版') }}</a-tag>
                    <a-tag v-else-if="record.is_template === 2" color="green">{{ $t('公开模版') }}</a-tag>
                </template>
            </a-table-column>
            <a-table-column :width="90" title="问卷类型" data-index="survey_type">
                <template #cell="{ record }">
                    <a-tag>{{ surveyType_string[record.survey_type] }}</a-tag>
                </template>
            </a-table-column>
            <a-table-column :width="60" title="问卷访问量" data-index="collect_visited"></a-table-column>
            <a-table-column :width="60" title="收集到的回答数量" data-index="collect_answer">
                <template #cell="{ record }">
                    <a-statistic animation :value="record.collect_answer" />
                </template>
            </a-table-column>
            <!-- prettier-ignore -->
            <a-table-column :width="110" title="创建时间" data-index="created_at"> <template #cell="{record}">{{ new Date(record.created_at).toLocaleString() }}</template> </a-table-column>
            <!-- prettier-ignore -->
            <a-table-column :width="110" title="更新时间" data-index="updated_at"> <template #cell="{record}">{{ new Date(record.updated_at).toLocaleString() }}</template> </a-table-column>
            <a-table-column :width="70" title="操作">
                <template #cell>
                    <a-button>修改</a-button>
                </template>
            </a-table-column>
        </template>
    </a-table>
    <a-modal v-model:visible="optionPaneVisual" @ok="changeOneSurvey" @cancel="() => (optionPaneVisual = false)">
        <template #title>修改问题</template>
        <div>
            <a-form-item :label="$t('问卷标题')">
                <a-textarea auto-size v-model="surveyListStore.state.updateData.title"></a-textarea>
            </a-form-item>
            <a-form-item :label="$t('问卷描述')">
                <a-textarea auto-size v-model="surveyListStore.state.updateData.title"></a-textarea>
            </a-form-item>
        </div>
    </a-modal>
</template>
