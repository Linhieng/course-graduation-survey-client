<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCollectStore } from '@/store';
import BaseContainer from '@/components/base-container/index.vue';

const collectStore = useCollectStore();
const router = useRouter();
const gotoCollectTable = (surveyId: number) => {
    router.push({ name: 'collect-table', params: { surveyId } });
};

export interface SearchParams {
    survey_name: string;
    survey_desc: string;
    survey_status: 'all' | 'stop' | 'publish';
    survey_create_range: (string | number | Date)[];
}

const initialSearchForm: SearchParams = {
    survey_name: '',
    survey_desc: '',
    survey_status: 'all',
    survey_create_range: ['', ''],
};
const searchForm = ref<SearchParams>(initialSearchForm);
function resetSearchForm() {
    console.log('?');
    // searchForm.value = initialSearchForm;
    searchForm.value.survey_create_range = ['', ''];
    searchForm.value.survey_name = '';
    searchForm.value.survey_desc = '';
    searchForm.value.survey_status = 'all';
}

const onPageChange = (current: number) => {
    console.log(current);
    collectStore.fetchSurveyListByPage({ current, searchParams: searchForm.value });
};
</script>

<template>
    <base-container :items="['问卷收集', '选择问卷']" title="选择一份问卷">
        <a-card>
            <a-row :gutter="8">
                <a-col :flex="1">
                    <a-form :model="searchForm" layout="inline">
                        <a-row :gutter="6">
                            <a-col :span="24">
                                <a-form-item field="createdTime" :label="$t('创建时间')">
                                    <a-range-picker v-model="searchForm.survey_create_range" style="width: 100%" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item field="survey_name" :label="$t('问卷名称')">
                                    <a-input v-model="searchForm.survey_name" :placeholder="$t('模糊搜索问卷名称')" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item field="survey_desc" :label="$t('问卷描述')">
                                    <a-input
                                        v-model="searchForm.survey_desc"
                                        :placeholder="$t('根据问卷描述模糊搜索')"
                                    />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item field="survey_status" :label="$t('发布状态')">
                                    <a-select v-model="searchForm.survey_status">
                                        <a-option value="all">{{ $t('所有') }}</a-option>
                                        <a-option value="publish">{{ $t('正在发布') }}</a-option>
                                        <a-option value="stop">{{ $t('已停止收集') }}</a-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-col>
                <a-divider style="height: 104px" direction="vertical"></a-divider>
                <a-col flex="200px">
                    <a-space direction="vertical" fill style="padding: 20px" size="medium">
                        <a-button type="primary" :style="{ width: '100%' }" @click="onPageChange(1)">
                            <template #icon>
                                <icon-search />
                            </template>
                            {{ $t('搜索问卷') }}
                        </a-button>
                        <a-button @click="resetSearchForm" :style="{ width: '100%' }">
                            <template #icon>
                                <icon-refresh />
                            </template>
                            {{ $t('重置条件') }}
                        </a-button>
                    </a-space>
                </a-col>
            </a-row>
            <a-divider></a-divider>
            <a-row :gutter="8">
                <a-col flex="1"></a-col>
                <a-col flex="100px">
                    <a-button type="primary" style="width: 100%" @click="onPageChange(1)">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{ $t('点击刷新') }}
                    </a-button>
                </a-col>
            </a-row>
            <a-space></a-space>
            <a-table
                row-key="id"
                :loading="collectStore.state.loading.fetchSurveyListByPage"
                :data="collectStore.state.search_survey.survey_list"
                :pagination="collectStore.state.search_survey.pagination"
                @page-change="onPageChange"
            >
                <template #columns>
                    <a-table-column :width="60" title="id" data-index="id" align="center"></a-table-column>
                    <a-table-column :width="200" :title="$t('标题')" data-index="title"></a-table-column>
                    <a-table-column :width="100" :title="$t('状态')" data-index="is_valid">
                        <template #cell="{ record }">
                            <a-tag v-if="record.is_valid" color="green">{{ $t('正在发布') }}</a-tag>
                            <a-tag v-else color="red">{{ $t('已停止') }}</a-tag>
                        </template>
                    </a-table-column>
                    <a-table-column :width="200" :title="$t('创建时间')" data-index="created_at">
                        <template #cell="{ record }">
                            <a-statistic
                                :value-style="{ 'font-size': '1rem' }"
                                :value="new Date(record.created_at)"
                                animation
                                format="YYYY-MM-DD HH:mm"
                            ></a-statistic>
                        </template>
                    </a-table-column>
                    <a-table-column :width="120" :title="$t('回答数量')" data-index="collect_answer">
                        <template #cell="{ record }">
                            <a-statistic
                                :value="record.collect_answer"
                                animation
                                :value-style="{ 'font-size': '1rem' }"
                            >
                                <template #suffix>
                                    {{ $t('份') }}
                                </template>
                            </a-statistic>
                        </template>
                    </a-table-column>
                    <a-table-column :width="100" :title="$t('访问次数')" data-index="collect_visited">
                        <template #cell="{ record }">
                            <a-statistic
                                :value="record.collect_visited"
                                animation
                                :value-style="{ 'font-size': '1rem' }"
                            >
                                <template #suffix>
                                    {{ $t('次') }}
                                </template>
                            </a-statistic>
                        </template>
                    </a-table-column>
                    <a-table-column :width="100" :title="$t('操作')">
                        <template #cell="{ record }">
                            <a-space direction="vertical" fill>
                                <a-button type="primary" @click="gotoCollectTable(record.id)">
                                    {{ $t('查看数据') }}
                                </a-button>
                            </a-space>
                        </template>
                    </a-table-column>
                </template>
                <template #pagination-right>
                    <a-space style="margin-left: 30px">
                        {{ $t('总数：') + collectStore.state.search_survey.pagination.total }}
                    </a-space>
                </template>
            </a-table>
        </a-card>
    </base-container>
</template>

<style scoped lang="scss"></style>
