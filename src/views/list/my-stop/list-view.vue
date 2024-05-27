<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue';
import { type SchemaSurvey, queryStopSurvey, publishSurvey } from '@/api/survey';
import { useWindowScroll } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useCreateStore } from '@/store';
import dayjs from 'dayjs';

/*
    目前无法使用 useScroll 获取页面滚动的状态 document.body 无效。
    所以我通过 document.body.scrollHeight - document.body.clientHeight 获取滚动条可滚动的高度
    然后监听 useWindowScroll().y 的值，但它临近可滚动高度时，说明快滚动到底部了。
*/
const { y: pageY } = useWindowScroll();
const createStore = useCreateStore();
const router = useRouter();

const loading = ref(false);
const btnDelLading = ref(false);
const btnCurId = ref();
const renderData = ref<SchemaSurvey[]>(new Array(8).fill({}));
const draftData = ref<SchemaSurvey[]>([]);

onBeforeMount(async () => {
    fetchData();
});
async function fetchData() {
    if (loading.value) return;
    loading.value = true;
    // 1
    const res = await queryStopSurvey();
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
    // 2-
    router.push({
        name: 'collect-table',
        params: {
            surveyId: id,
        },
    });
};
const del = async (id: number) => {
    if (btnDelLading.value) return;
    btnDelLading.value = true;
    btnCurId.value = id;
    // 3
    const res = await publishSurvey(id);
    if (res.ok) {
        fetchData();
    }
    btnDelLading.value = false;
};

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
    <div>
        <template v-if="loading">
            <div style="padding: 20px" v-for="_ in 4">
                <a-skeleton :animation="true">
                    <a-skeleton-line :widths="['50%', '100%']" :rows="2" />
                </a-skeleton>
            </div>
        </template>
        <template v-else>
            <div v-for="item in renderData" :key="item.id">
                <div class="list-item">
                    <div class="data-show">
                        <a-tooltip :content="$t('id')">
                            <a-tag class="no-flex" size="large" color="blue">{{ item.id }}</a-tag>
                        </a-tooltip>
                        <span class="space"></span>
                        <a-tooltip :content="$t('问卷标题')">
                            <a-tag class="no-flex" size="large">{{ item.title }}</a-tag>
                        </a-tooltip>
                        <span class="space"></span>
                        <a-tooltip :content="$t('问卷描述：') + item.comment" v-if="item.comment.trim()">
                            <span class="ellipsis">
                                {{ item.comment }}
                            </span>
                        </a-tooltip>
                    </div>
                    <div class="action">
                        <a-space>
                            <a-tooltip :content="$t('创建时间')">
                                <span>{{ dayjs(item.created_at).format('YYYY-MM-DD HH:mm') }}</span>
                            </a-tooltip>
                            <a-divider direction="vertical"></a-divider>
                            <a-tooltip :content="$t('更新时间')">
                                <span>{{ dayjs(item.created_at).format('YYYY-MM-DD HH:mm') }}</span>
                            </a-tooltip>
                            <a-divider direction="vertical"></a-divider>
                            <!-- 4,5 -->
                            <a-button
                                type="primary"
                                :loading="editLoading && editId === item.id"
                                @click="gotoEdit(item.id)"
                                :disabled="editLoading"
                                class="end"
                            >
                                <template #icon>
                                    <icon-eye />
                                </template>
                                {{ $t('查看数据') }}
                            </a-button>
                            <a-button class="end" :loading="btnCurId === item.id && btnDelLading" @click="del(item.id)">
                                <template #icon>
                                    <icon-font :size="24" name="continue"></icon-font>
                                </template>
                                {{ $t('继续发布') }}
                            </a-button>
                        </a-space>
                    </div>
                </div>
            </div>
            <a-button v-if="renderData.length < draftData.length" style="margin: 10px" @click="() => showMore()">
                {{ $t('加载更多') }}
            </a-button>
        </template>
    </div>
</template>

<style scoped lang="scss">
.list-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #e8e8e8;

    .data-show {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        overflow-x: auto;
    }
    .action {
        flex: 0 0 auto;
        margin-left: 1rem;
        display: flex;
    }
}
.space {
    display: inline-block;
    width: 10px;
}
.no-flex {
    flex: 0 0 auto;
}
.ellipsis {
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
