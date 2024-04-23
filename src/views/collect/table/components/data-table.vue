<script setup lang="ts">
import { useCollectStore } from '@/store';
import { CollectAnswer } from '@/store/modules/collect/types';
import { reactive } from 'vue';
import OneAnswer from './one-answer.vue';
import { TableColumnData } from '@arco-design/web-vue';
const collectStore = useCollectStore();

const props = defineProps<{
    surveyId: number;
}>();

collectStore.fetchAnswerCollectBySurveyId(props.surveyId);

const is_valid_filterable = {
    filters: [
        // 这里的 value 得是字符串，不然组件会报类型错误
        { text: '有效', value: '1' },
        { text: '无效', value: '0' },
    ],
    // value 是一个数组，元素是用户选中的内容 filters 中的 value
    // filter: (value: string[], row: CollectAnswer) => value[0] === '1',
    // @ts-ignore 这里不能有类型，不然组件同样会报类型错误
    filter: (value, row) => value[0] === '1',
};
const columns: TableColumnData[] = [
    {
        title: '回答用户',
        dataIndex: 'user_name',
        width: 100,
    },
    {
        title: '填写花费时间',
        dataIndex: 'spend_time_text',
        width: 150,
        sortable: {
            sortDirections: ['ascend', 'descend'],
            sorter: (a: CollectAnswer, b: CollectAnswer, { direction }) => {
                if (direction === 'ascend') return a.spend_time - b.spend_time;
                return b.spend_time - a.spend_time;
            },
        },
    },
    // {
    //     title: '是否有效',
    //     dataIndex: 'is_valid_text',
    //     width: 110,
    //     filterable: is_valid_filterable,
    // },
    {
        title: 'IP 来源',
        dataIndex: 'ip_from',
        width: 150,
    },
    {
        title: '提交时间',
        dataIndex: 'created_date',
        width: 200,
        sortable: {
            sortDirections: ['ascend', 'descend'],
            // 没有效果……
            sorter: (a: CollectAnswer, b: CollectAnswer, { direction }) => {
                if (direction === 'ascend') return a.created_at.getTime() - b.created_at.getTime();
                return b.created_at.getTime() - a.created_at.getTime();
            },
        },
    },
    {
        title: '浏览器',
        dataIndex: 'user_browser',
        width: 110,
        filterable: {
            filters: [
                { text: '微软 Edge', value: '0' },
                { text: '谷歌', value: '1' },
                { text: '火狐', value: '2' },
                { text: '其他', value: '3' },
            ],
            filter: (values, row: CollectAnswer) => {
                return values.some((v) => {
                    return row.user_browser_flag === v;
                });
            },
            multiple: true,
        },
    },
    {
        title: '操作系统',
        dataIndex: 'user_os',
        width: 100,
    },
    {
        title: '使用设备',
        dataIndex: 'user_device',
        width: 100,
    },
] as TableColumnData[];

const expandable = reactive({
    title: '展开',
    width: 80,
});
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
            filter-icon-align-left
            table-layout-fixed
            column-resizable
            :expandable="expandable"
            :bordered="{ cell: true }"
            row-key="id"
        >
            <template #expand-row="{ record }">
                <OneAnswer :answer-list="record.answer_structure_json.data" />
            </template>
            <!-- 使用了 columns 后，前面的 :columns="columns" 就无效了 -->
            <template #columns>
                <a-table-column
                    v-for="item in columns"
                    :title="typeof item.title === 'string' ? item.title : ''"
                    :data-index="item.dataIndex"
                    :sortable="item.sortable ? item.sortable : undefined"
                    :width="item.width"
                    :filterable="item.filterable ? item.filterable : undefined"
                >
                    <!-- 这里报错 -->
                    <!-- <template v-if="item.title === '是否有效'">
                            <template #cell="{ record }">
                                <a-tag v-if="record.is_valid === 1" color="green">有效</a-tag>
                                <a-tag v-else color="red">无效</a-tag>
                            </template>
                    </template> -->
                </a-table-column>
                <a-table-column
                    title="是否有效"
                    data-index="is_valid_text"
                    :width="110"
                    :filterable="is_valid_filterable"
                >
                    <template #cell="{ record }">
                        <a-tag v-if="record.is_valid === 1" color="green">有效</a-tag>
                        <a-tag v-else color="red">无效</a-tag>
                    </template>
                </a-table-column>
            </template>
        </a-table>
    </div>
</template>

<style scoped lang="less"></style>
