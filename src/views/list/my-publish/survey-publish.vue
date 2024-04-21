<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { queryPublishSurvey, SchemaSurvey, stopSurvey } from '@/api/survey';

const loading = ref(false);
const btnLoading = ref(false);
const btnLoadingId = ref();
const renderData = ref<SchemaSurvey[]>(new Array(8).fill({}));
onBeforeMount(async () => {
    fetchData();
});
async function fetchData() {
    if (loading.value) return;
    loading.value = true;
    const res = await queryPublishSurvey();
    if (res.ok) {
        renderData.value = res.data;
    }
    loading.value = false;
}
const stop = async (id: number) => {
    if (btnLoading.value) return;
    btnLoading.value = true;
    btnLoadingId.value = id;
    const res = await stopSurvey(id);
    if (res.ok) {
        fetchData();
    }
    btnLoading.value = false;
};
const gotoStat = (id: number) => {
    console.log(id);
};
</script>

<template>
    <div class="list-wrap">
        <a-typography-title class="block-title" :heading="6">
            {{ $t('已发布的问卷') }}
        </a-typography-title>
        <a-row class="list-row" :gutter="24">
            <a-col
                v-for="item in renderData"
                :key="item.id"
                class="list-col"
                :xs="12"
                :sm="12"
                :md="12"
                :lg="6"
                :xl="6"
                :xxl="6"
            >
                <div class="card-wrap">
                    <a-card v-if="loading" :bordered="false" hoverable>
                        <a-skeleton :animation="true">
                            <a-skeleton-line :widths="['50%', '50%', '100%', '40%']" :rows="4" />
                            <a-skeleton-line :widths="['40%']" :rows="1" />
                        </a-skeleton>
                    </a-card>
                    <a-card v-else :bordered="false" hoverable>
                        <a-space align="start">
                            <a-card-meta>
                                <template #title>
                                    <a-typography-text style="margin-right: 10px">
                                        {{ $t('问卷标题：') + item.title }}
                                    </a-typography-text>
                                </template>
                                <template #description>
                                    <p>{{ $t('问卷说明：') + item.comment }}</p>
                                    <a-descriptions
                                        style="margin-top: 16px"
                                        :data="[
                                            {
                                                label: $t('创建时间'),
                                                value: new Date(item.created_at).toLocaleString(),
                                            },
                                            {
                                                label: $t('最近更新'),
                                                value: new Date(item.updated_at).toLocaleString(),
                                            },
                                        ]"
                                        layout="inline-horizontal"
                                        :column="1"
                                    />
                                    <br />
                                </template>
                            </a-card-meta>
                        </a-space>
                        <template #actions>
                            <a-space>
                                <a-button :loading="btnLoadingId === item.id && btnLoading" @click="stop(item.id)">
                                    {{ $t('停止发布') }}
                                </a-button>
                                <a-button type="primary" @click="gotoStat(item.id)">
                                    {{ $t('查看数据') }}
                                </a-button>
                            </a-space>
                        </template>
                    </a-card>
                </div>
            </a-col>
            <a-col v-if="!loading && renderData.length < 1">
                <a-empty />
            </a-col>
        </a-row>
    </div>
</template>

<style scoped lang="less">
.card-wrap {
    height: 100%;
    transition: all 0.3s;
    border: 1px solid var(--color-neutral-3);
    margin-bottom: 30px;
    &:hover {
        transform: translateY(-4px);
    }
    :deep(.arco-card-meta-description) {
        color: rgb(var(--gray-6));
        .arco-descriptions-item-label-inline {
            font-weight: normal;
            font-size: 12px;
            color: rgb(var(--gray-6));
        }
        .arco-descriptions-item-value-inline {
            color: rgb(var(--gray-8));
        }
    }
}
.empty-wrap {
    height: 200px;
    border-radius: 4px;
    :deep(.arco-card) {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        .arco-result-title {
            color: rgb(var(--gray-6));
        }
    }
}
</style>
