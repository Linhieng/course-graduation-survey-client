<script setup lang="ts">
import { useCollectStore } from '@/store';
const collectStore = useCollectStore();

const props = defineProps<{
    surveyId: number;
}>();

collectStore.fetchAnswerCollectBySurveyId(props.surveyId);

const columns = [
    {
        title: '回答用户',
        dataIndex: 'user_name',
    },
    {
        title: '填写花费时间',
        dataIndex: 'spend_time_text',
    },
    {
        title: '是否有效',
        dataIndex: 'is_valid_text',
    },
    {
        title: 'IP 来源',
        dataIndex: 'ip_from',
    },
    {
        title: '提交时间',
        dataIndex: 'created_date',
    },
    {
        title: '浏览器',
        dataIndex: 'user_browser',
    },
    {
        title: '操作系统',
        dataIndex: 'user_os',
    },
    {
        title: '使用设备',
        dataIndex: 'user_device',
    },
];
</script>

<template>
    <div class="table-box">
        <h2>收集到的数据：</h2>
        <a-table
            :columns="columns"
            :data="collectStore.state.cur.answerList"
            :loading="collectStore.state.loading.fetchAnswerCollectBySurveyId"
        />
    </div>
</template>

<style scoped lang="less"></style>
