<script setup lang="ts">
import { useCollectStore } from '@/store';
import type { CollectAnswer } from '@/store/modules/collect/types';
import { reactive, ref } from 'vue';
import OneAnswer from './one-answer.vue';
import type { TableColumnData, TableData } from '@arco-design/web-vue';
import { changeAnswerValid } from '@/api/answer';
import { useI18n } from 'vue-i18n';
const collectStore = useCollectStore();

const { t } = useI18n();

const props = defineProps<{
    surveyId: number;
}>();

collectStore.fetchAnswerCollectBySurveyId(props.surveyId);

const is_valid_filterable = {
    filters: [
        // 这里的 value 得是字符串，不然组件会报类型错误
        { text: '有效', value: '有效' },
        { text: '无效', value: '无效' },
    ],
    // value 是一个数组，元素是用户选中的内容 filters 中的 value
    filter: (value: string[], row: TableData) => (row as CollectAnswer).is_valid_text === value[0],
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
    title: t('展开'),
    width: 80,
});

//
//
//
//
const optionPaneVisual = ref(false);
const curChangeData = ref<Partial<CollectAnswer>>({
    id: undefined,
    is_valid: 1,
});
const openChangeOneAnswer = (record: CollectAnswer) => {
    curChangeData.value.is_valid = record.is_valid;
    curChangeData.value.id = record.id;
    optionPaneVisual.value = true;
};
const changeOneAnswer = async () => {
    const status = curChangeData.value.is_valid as 0 | 1;
    const id = curChangeData.value.id as number;
    const res = await changeAnswerValid({ ids: [id], status });
    if (res.ok) {
        collectStore.fetchAnswerCollectBySurveyId();
    }
};
</script>

<template>
    <div class="table-box">
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
                <OneAnswer
                    :answer-list="record.answer_structure_json.data"
                    :question-list="collectStore.state.cur.survey.questionList"
                />
            </template>
            <!-- 使用了 columns 后，前面的 :columns="columns" 就无效了 -->
            <template #columns>
                <a-table-column
                    v-for="item in columns"
                    :title="typeof item.title === 'string' ? $t(item.title) : ''"
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
                    :title="$t('是否有效')"
                    data-index="is_valid_text"
                    :width="110"
                    :filterable="is_valid_filterable"
                >
                    <template #cell="{ record }">
                        <a-tag v-if="record.is_valid === 1" color="green">{{ $t('有效') }}</a-tag>
                        <a-tag v-else color="red">{{ $t('无效') }}</a-tag>
                    </template>
                </a-table-column>
                <a-table-column :title="$t('操作')" :width="100">
                    <template #cell="{ record }">
                        <a-button @click="() => openChangeOneAnswer(record)">{{ $t('修改') }}</a-button>
                    </template>
                </a-table-column>
            </template>
        </a-table>
    </div>
    <a-modal v-model:visible="optionPaneVisual" @ok="changeOneAnswer" @cancel="() => (optionPaneVisual = false)">
        <template #title>{{ $t('修改问题') }}</template>
        <div>
            <a-form :model="curChangeData">
                <a-form-item
                    :tooltip="$t('请选择答案的有效性')"
                    :label="$t('设置答案的有效性')"
                    label-col-flex="max-content"
                >
                    <a-radio-group v-model="curChangeData.is_valid">
                        <a-radio :value="0">{{ $t('无效') }}</a-radio>
                        <a-radio :value="1">{{ $t('有效') }}</a-radio>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </div>
    </a-modal>
</template>

<style scoped lang="scss">
:deep(.arco-form-item-label-col.arco-form-item-label-col-flex) {
    flex: 0 0 max-content;
}
</style>
