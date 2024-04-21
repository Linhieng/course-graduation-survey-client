<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUnmount, watch } from 'vue';
import { queryDraftSurvey, SchemaSurvey, delSurvey } from '@/api/survey';
import { useScroll } from '@vueuse/core';
const loading = ref(false);
const btnDelLading = ref(false);
const btnCurId = ref();
const renderData = ref<SchemaSurvey[]>(new Array(8).fill({}));
const draftData = ref<SchemaSurvey[]>();
const scrollEl = ref();

const { arrivedState } = useScroll(scrollEl);

onBeforeMount(async () => {
    fetchData();
});
async function fetchData() {
    if (loading.value) return;
    loading.value = true;
    const res = await queryDraftSurvey();
    if (res.ok) {
        draftData.value = res.data;
        renderData.value = draftData.value.slice(0, 8);
    }
    loading.value = false;
}
const gotoEdit = (id: number) => {
    // useRouter().push({})
};
const del = async (id: number) => {
    if (btnDelLading.value) return;
    btnDelLading.value = true;
    btnCurId.value = id;
    const res = await delSurvey(id);
    if (res.ok) {
        fetchData();
    }
    btnDelLading.value = false;
};

watch(
    () => arrivedState.bottom,
    (arrivedBottom) => {
        if (arrivedBottom && draftData.value && renderData.value.length < draftData.value.length) {
            const curLen = renderData.value.length;
            // TODO: 这里会阻塞页面
            renderData.value.push(...draftData.value.slice(curLen, curLen + 4));
        }
    },
);
</script>
<template>
    <div class="container">
        <div class="no-scroll-box">
            <Breadcrumb :items="['我的问卷', '所有问卷']" />
            <a-typography-title class="block-title" :heading="6">
                {{ $t('已停止的问卷') }}
            </a-typography-title>
            <div class="list-wrap" ref="scrollEl">
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
                                        <a-button :loading="btnCurId === item.id && btnDelLading" @click="del(item.id)">
                                            {{ $t('删除草稿') }}
                                        </a-button>
                                        <a-button type="primary" @click="gotoEdit(item.id)">
                                            {{ $t('编辑问卷') }}
                                        </a-button>
                                    </a-space>
                                </template>
                            </a-card>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}
.no-scroll-box {
    position: absolute;
    top: 10px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    overflow: hidden;
}
.list-wrap {
    position: absolute;
    top: 110px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 12px;
}

.card-wrap {
    width: 100%;
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
