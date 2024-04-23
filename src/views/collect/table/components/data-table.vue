<script setup lang="ts">
import { useCollectStore } from '@/store';
import { CollectAnswer } from '@/store/modules/collect/types';
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
        filterable: {
            filters: [
                // 这里的 value 得是字符串，不然组件会报类型错误
                { text: '有效', value: '1' },
                { text: '无效', value: '0' },
            ],
            // value 是一个数组，元素是用户选中的内容 filters 中的 value
            // filter: (value: string[], row: CollectAnswer) => value[0] === '1',
            // @ts-ignore 这里不能有类型，不然组件同样会报类型错误
            filter: (value, row) => value[0] === '1',
        },
    },
    {
        title: 'IP 来源',
        dataIndex: 'ip_from',
    },
    {
        title: '提交时间',
        dataIndex: 'created_date',
        // Sortable
    },
    {
        title: '浏览器',
        dataIndex: 'user_browser',
        filterable: {
            filters: [
                { text: '微软 Edge', value: '0' },
                { text: '谷歌', value: '1' },
                { text: '火狐', value: '2' },
                { text: '其他', value: '3' },
            ],
            // @ts-ignore 这里不能有类型，不然组件同样会报类型错误
            filter: (values, row) => {
                return (values as string[]).some((v) => {
                    return (row as CollectAnswer).user_browser_flag === v;
                });
            },
            multiple: true,
        },
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
        <a-space direction="vertical" fill>
            <a-button type="primary" @click="collectStore.fetchAnswerCollectBySurveyId">点击刷新数据</a-button>
            <h2>收集到的数据：</h2>
        </a-space>
        <a-table
            :columns="columns"
            :data="collectStore.state.cur.answerList"
            :loading="collectStore.state.loading.fetchAnswerCollectBySurveyId"
            :stripe="true"
            :filter-icon-align-left="true"
        />
    </div>
</template>

<style scoped lang="less"></style>
