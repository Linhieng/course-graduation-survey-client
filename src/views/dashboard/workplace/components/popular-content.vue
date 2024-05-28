<template>
    <a-spin :loading="loading" style="width: 100%">
        <a-card
            class="general-card"
            :header-style="{ paddingBottom: '0' }"
            :body-style="{ padding: '17px 20px 21px 20px' }"
        >
            <template #title>
                {{ $t('问卷排行榜') }}
                <a-tooltip :content="$t('问卷排行榜根据问卷收集到的答案数进行排序')">
                    <icon-question-circle />
                </a-tooltip>
            </template>
            <template #extra>
                <!-- <a-link>{{ $t('workplace.viewMore') }}</a-link> -->
            </template>
            <a-space direction="vertical" :size="10" fill>
                <a-radio-group v-model:model-value="type" type="button" @change="typeChange as any">
                    <a-radio value="allRank">
                        {{ $t('所有问卷') }}
                    </a-radio>
                    <a-radio value="publishRank">
                        {{ $t('正在发布') }}
                    </a-radio>
                    <a-radio value="stopRank">
                        {{ $t('停止回收') }}
                    </a-radio>
                </a-radio-group>
                <a-table :data="renderList" :pagination="false" :bordered="false" :scroll="{ x: '100%', y: '264px' }">
                    <template #columns>
                        <a-table-column :width="60" :title="$t('排名')" data-index="rank">
                            <template #cell="{ record }">
                                <a-tag :color="rank2color[record.rank]">{{ record.rank }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :width="60" :title="$t('回答量')" data-index="count_answer">
                            <template #cell="{ record }">
                                <a-statistic
                                    animation
                                    :value="record.count_answer"
                                    :value-style="{ fontSize: '1.2rem' }"
                                />
                            </template>
                        </a-table-column>
                        <a-table-column :width="100" :title="$t('标题')" data-index="title">
                            <template #cell="{ record }">
                                <a-typography-paragraph
                                    :ellipsis="{
                                        rows: 1,
                                    }"
                                >
                                    {{ record.title }}
                                </a-typography-paragraph>
                            </template>
                        </a-table-column>
                        <a-table-column :width="100" :title="$t('操作')">
                            <template #cell="{ record }">
                                <a-button type="primary" @click="gotoViewSurveyStat(record.id)">
                                    {{ $t('点击查看') }}
                                </a-button>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </a-space>
        </a-card>
    </a-spin>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useLoading from '@/hooks/loading';
import { useRouter } from 'vue-router';
import { getPopularStatSurveyAnswerRank } from '@/api/stat';
const router = useRouter();
type ContentType = 'allRank' | 'publishRank' | 'stopRank';
export interface RankItem {
    rank: number;
    count_answer: number;
    title: string;
}
const type = ref<ContentType>('allRank');
const { loading, setLoading } = useLoading();
const renderList = ref<RankItem[]>();

const rank2color: Record<number, string> = {
    '1': 'red',
    '2': 'green',
    '3': 'blue',
    '4': 'gray',
    '5': 'gray',
};

/** 缓存已经获得到的内容，切换时直接获取 */
const fetchList = ref<{
    allRank: RankItem[];
    publishRank: RankItem[];
    stopRank: RankItem[];
}>();

const fetchData = async (contentType: ContentType = 'allRank', flush = false) => {
    if (!flush && fetchList.value) {
        renderList.value = fetchList.value[contentType];
        return;
    }

    setLoading(true);
    const res = await getPopularStatSurveyAnswerRank();
    if (res.ok) {
        fetchList.value = res.data;
        renderList.value = res.data[contentType];
    }

    setLoading(false);
};
const typeChange = (contentType: ContentType) => {
    fetchData(contentType);
};
fetchData('allRank');

function gotoViewSurveyStat(surveyId: number) {
    router.push({
        name: 'collect-table',
        params: {
            surveyId,
        },
    });
}
</script>

<style scoped lang="scss">
.general-card {
    min-height: 395px;
}
:deep(.arco-table-tr) {
    height: 44px;
    .arco-typography {
        margin-bottom: 0;
    }
}
.increases-cell {
    display: flex;
    align-items: center;
    span {
        margin-right: 4px;
    }
}
</style>
