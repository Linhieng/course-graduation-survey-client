<script setup lang="ts">
import useSurveyListStore from '@/store/modules/survey-list';
import { reactive, ref } from 'vue';
const surveyListStore = useSurveyListStore();

const condition = ref({
    title: '',
    comment: '',
    survey_type: undefined,
    status: undefined,
    is_template: undefined,
    created_range: undefined,
    updated_range: undefined,
    order_by: undefined,
    order_type: undefined,
});
function resetCondition() {
    condition.value = {
        title: '',
        comment: '',
        survey_type: undefined,
        status: undefined,
        is_template: undefined,
        created_range: undefined,
        updated_range: undefined,
        order_by: undefined,
        order_type: undefined,
    };
}

function search() {
    surveyListStore.searchSurveyList(condition.value);
}
</script>

<template>
    <a-space direction="vertical">
        <div class="row1">
            <a-form-item :label="$t('问卷名称')" class="flex-grow">
                <a-textarea auto-size v-model="condition.title"></a-textarea>
            </a-form-item>
            <a-form-item :label="$t('问卷描述')" class="flex-grow">
                <a-textarea auto-size v-model="condition.comment"></a-textarea>
            </a-form-item>
        </div>
        <a-form-item :label="$t('问卷类型')">
            <a-select :placeholder="$t('请选择……')" v-model="condition.survey_type">
                <a-option :value="undefined">{{ $t('所有') }}</a-option>
                <a-option :value="0">{{ $t('常规问卷') }}</a-option>
                <a-option :value="1">{{ $t('调研问卷') }}</a-option>
                <a-option :value="2">{{ $t('心理问卷') }}</a-option>
            </a-select>
        </a-form-item>
        <a-form-item :label="$t('问卷状态')">
            <a-select :placeholder="$t('请选择……')" v-model="condition.status">
                <a-option :value="undefined">{{ $t('所有') }}</a-option>
                <a-option :value="0">{{ $t('已删除') }}</a-option>
                <a-option :value="1">{{ $t('草稿') }}</a-option>
                <a-option :value="2">{{ $t('发布中') }}</a-option>
                <a-option :value="3">{{ $t('已停止') }}</a-option>
            </a-select>
        </a-form-item>
        <a-form-item :label="$t('模版类型')">
            <a-select :placeholder="$t('请选择……')" v-model="condition.is_template">
                <a-option :value="undefined">{{ $t('所有') }}</a-option>
                <a-option :value="0">{{ $t('非模版') }}</a-option>
                <a-option :value="1">{{ $t('私有模版') }}</a-option>
                <a-option :value="2">{{ $t('公开模版') }}</a-option>
            </a-select>
        </a-form-item>
        <a-form-item :label="$t('创建时间')">
            <a-range-picker v-model="condition.created_range" />
        </a-form-item>
        <a-form-item :label="$t('更新时间')">
            <a-range-picker v-model="condition.updated_range" />
        </a-form-item>
        <a-form-item tooltip="点击清除则采用默认排序" :label="$t('排序方式')">
            <a-select :placeholder="$t('请选择……')" v-model="condition.order_by" allow-clear>
                <a-option value="updated_at">{{ $t('按更新时间排序') }}</a-option>
                <a-option value="created_at">{{ $t('按创建时间排序') }}</a-option>
                <a-option value="collect_visited">{{ $t('按访问量进行排序') }}</a-option>
                <a-option value="collect_answer">{{ $t('按收集的答案数量排序') }}</a-option>
            </a-select>
        </a-form-item>
        <a-form-item tooltip="需要先选择排序方式，才能选择排序方向" :label="$t('排序方向')">
            <a-radio-group v-model="condition.order_type" :disabled="condition.order_by === undefined">
                <a-radio value="ASC">升序</a-radio>
                <a-radio value="DESC">降序</a-radio>
            </a-radio-group>
        </a-form-item>
    </a-space>
    <br />
    <a-space>
        <a-button :loading="surveyListStore.state.loading.searching" type="primary" @click="search">搜索问卷</a-button>
        <a-button @click="resetCondition">重置条件</a-button>
    </a-space>
</template>
<style scoped lang="less">
.row1 {
    display: flex;
    .flex-grow {
        padding-right: 20px;
        flex: 1 0 auto;
    }
}
</style>
