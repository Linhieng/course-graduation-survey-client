<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUnmount, watch } from 'vue';
import { queryDraftSurvey, type SchemaSurvey, delSurvey } from '@/api/survey';
import { useScroll } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useCreateStore } from '@/store';
import { useWindowScroll } from '@vueuse/core';

const { y: pageY } = useWindowScroll();
const createStore = useCreateStore();
const router = useRouter();

const loading = ref(false);
const btnDelLading = ref(false);
const btnCurId = ref();
const renderData = ref<SchemaSurvey[]>(new Array(8).fill({}));
const draftData = ref<SchemaSurvey[]>([]);
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
const editLoading = ref(false);
const editId = ref();
const gotoEdit = async (id: number) => {
    if (editLoading.value) return;
    editId.value = id;
    editLoading.value = true;
    await createStore.importFromDraft(id);
    editLoading.value = false;
    router.push({
        name: 'Create',
    });
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
            // TODO: 这里会阻塞页面。升级 vite 后好像又不会了，现在很顺利，一点都不卡……
            renderData.value.push(...draftData.value.slice(curLen, curLen + 4));
        }
    },
);

watch(pageY, (pageY) => {
    const body = document.body;
    const leftScrollHeight = body.scrollHeight - body.clientHeight;
    if (leftScrollHeight - pageY < 10) {
        showMore();
    }
});

function showMore(number = 10) {
    if (renderData.value.length < draftData.value.length) {
        renderData.value.push(...draftData.value.slice(renderData.value.length, renderData.value.length + number));
    }
}
</script>

<template>
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
                <span class="pin">
                    <a-tag color="green">{{ item.id }}</a-tag>
                </span>
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
                                    {{ item.title }}
                                </a-typography-text>
                            </template>
                            <template #description>
                                {{ $t('更新时间：') + new Date(item.updated_at).toLocaleString() }}
                                <br />
                                <br />
                                <a-typography-paragraph :ellipsis="{ rows: 3, showTooltip: true }">
                                    {{ item.comment }}
                                </a-typography-paragraph>
                                <br />
                                <br />
                            </template>
                        </a-card-meta>
                    </a-space>
                    <template #actions>
                        <a-space>
                            <a-button :loading="btnCurId === item.id && btnDelLading" @click="del(item.id)">
                                <template #icon>
                                    <icon-delete />
                                </template>
                                {{ $t('删除') }}
                            </a-button>
                            <a-button
                                type="primary"
                                :loading="editLoading && editId === item.id"
                                @click="gotoEdit(item.id)"
                                :disabled="editLoading"
                            >
                                <template #icon>
                                    <icon-edit />
                                </template>
                                {{ $t('编辑') }}
                            </a-button>
                        </a-space>
                    </template>
                </a-card>
            </div>
        </a-col>
        <a-col
            :xs="12"
            :sm="12"
            :md="12"
            :lg="6"
            :xl="6"
            :xxl="6"
            class="list-col"
            v-if="renderData.length < draftData.length"
        >
            <a-button @click="() => showMore()">{{ $t('加载更多') }}</a-button>
        </a-col>
    </a-row>
</template>

<style scoped lang="scss">
.card-wrap {
    height: 100%;
    transition: all 0.3s;
    border: 1px solid var(--color-neutral-3);
    border-radius: 4px;
    &:hover {
        transform: translateY(-4px);
        // box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    }
    :deep(.arco-card) {
        height: 100%;
        border-radius: 4px;
        .arco-card-body {
            height: 100%;
            .arco-space {
                width: 100%;
                height: 100%;
                .arco-space-item {
                    height: 100%;
                    &:last-child {
                        flex: 1;
                    }
                    .arco-card-meta {
                        height: 100%;
                        display: flex;
                        flex-flow: column;
                        .arco-card-meta-content {
                            flex: 1;
                            .arco-card-meta-description {
                                margin-top: 8px;
                                color: rgb(var(--gray-6));
                                line-height: 20px;
                                font-size: 12px;
                            }
                        }
                        .arco-card-meta-footer {
                            margin-top: 0;
                        }
                    }
                }
            }
        }
    }
    :deep(.arco-card-meta-title) {
        display: flex;
        align-items: center;

        // To prevent the shaking
        line-height: 28px;
    }
    :deep(.arco-skeleton-line) {
        &:last-child {
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
        }
    }
}
.card-wrap {
    position: relative;
    .pin {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
    }
}

.list-col {
    margin-bottom: 20px;
}
</style>
