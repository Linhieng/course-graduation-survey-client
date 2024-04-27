<script setup lang="ts">
import { getSurveyMyTemplate, toggleSurveyTemplateShare } from '@/api/survey';
import { reactive, ref } from 'vue';
import useLoading from '@/hooks/loading';
import { useRouter } from 'vue-router';
import { useCreateStore, useUserStore } from '@/store';
import { Survey } from '@/store/modules/create/types';
import bg2 from '@/assets/images/bg2.png';
const router = useRouter();
const createStore = useCreateStore();
const useStore = useUserStore();

const { loading: fetching, setLoading: setFetching } = useLoading();
const surveyList = ref<Survey[]>(Array(8).fill([]) as any);
const gotoId = ref();
const gotoLoading = ref(false);
const isGotoEdit = ref(false);
const toggleLoading = ref<Set<number>>(new Set());

//
//
//
//
//
//
// 分页
const page = reactive({
    total: 0,
    cur: 1,
    size: 8,
});
/** 切换单页数据量 */
async function changePageSize(pageSize: number) {
    if (pageSize === page.size) return;
    page.cur = 1;
    page.size = pageSize;
    changePage(page.cur);
}
/** 点击页码 */
async function changePage(current: number) {
    if (fetching.value) return;
    page.cur = current;
    await fetchMySurveyTemplate();
}
//
//
//
//

fetchMySurveyTemplate();
async function fetchMySurveyTemplate() {
    if (fetching.value) return;
    setFetching(true);
    const res = await getSurveyMyTemplate(page.cur, page.size);
    if (res.ok) {
        surveyList.value = res.data.surveyTemplate;
        page.cur = res.data.pageStart;
        page.total = res.data.count;
        page.size = res.data.pageSize;
    }
    setFetching(false);
}

async function gotoUseSurvey(id: number) {
    if (gotoLoading.value) return;
    isGotoEdit.value = false;
    gotoId.value = id;
    gotoLoading.value = true;
    await createStore.importFromTemplate(id);
    gotoLoading.value = false;
    router.push({ name: 'Create' });
}

const toggleShare = async (surveyId: number) => {
    if (toggleLoading.value.has(surveyId)) return;
    toggleLoading.value.add(surveyId);
    await toggleSurveyTemplateShare(surveyId);
    surveyList.value.forEach((item) => {
        if (item.id === surveyId) {
            item.is_template = item.is_template === 1 ? 2 : 1;
        }
    });

    toggleLoading.value.delete(surveyId);
};

const gotoEditSurvey = async (id: number) => {
    if (gotoLoading.value) return;
    isGotoEdit.value = true;
    gotoId.value = id;
    gotoLoading.value = true;
    await createStore.editSurveyTemplate(id);
    gotoLoading.value = false;
    router.push({ name: 'Create' });
};
</script>

<template>
    <div class="container">
        <a-button :loading="fetching" @click="() => fetchMySurveyTemplate()">刷新</a-button>
        <a-empty style="height: 300px" v-if="surveyList.length < 1"></a-empty>
        <div class="item-box">
            <div class="item" v-for="item in surveyList">
                <a-spin :loading="fetching" dot>
                    <div class="card" :style="{ '--bg-url': `url(${bg2})` }">
                        <div class="pin">
                            <a-space>
                                <a-tag :color="item.is_template === 1 ? 'red' : 'green'">
                                    {{ item.is_template === 1 ? $t('这是私有模版') : $t('这是共享模版') }}
                                </a-tag>
                                <a-tooltip :content="item.is_template === 1 ? $t('公开模版') : $t('设为私有')">
                                    <a-button
                                        :loading="toggleLoading.has(item.id as number)"
                                        @click="() => toggleShare(item.id as number)"
                                        size="mini"
                                        shape="circle"
                                    >
                                        <template #icon>
                                            <icon-font :name="item.is_template === 1 ? 'hide' : 'show'" />
                                        </template>
                                    </a-button>
                                </a-tooltip>
                            </a-space>
                        </div>
                        <a-space direction="vertical" fill class="item-content acrylic">
                            <a-space>
                                <a-avatar
                                    :image-url="useStore.avatar"
                                    object-fit="cover"
                                    style="width: 30px; height: 30px"
                                ></a-avatar>
                                <p>{{ item.title }}</p>
                            </a-space>
                            <div class="flex-center">
                                <a-button
                                    :loading="gotoLoading && !isGotoEdit && gotoId === item.id"
                                    :disabled="gotoLoading"
                                    type="primary"
                                    @click="() => gotoUseSurvey(item.id as number)"
                                >
                                    使用该模版
                                </a-button>
                                <a-button
                                    :loading="gotoLoading && isGotoEdit && gotoId === item.id"
                                    @click="() => gotoEditSurvey(item.id as number)"
                                >
                                    编辑模版
                                </a-button>
                            </div>
                        </a-space>
                    </div>
                </a-spin>
            </div>
        </div>
        <div class="pagination-box">
            <a-pagination
                :total="page.total"
                :default-page-size="page.size"
                show-total
                show-jumper
                show-page-size
                :page-size-options="[4, 8]"
                @page-size-change="changePageSize"
                @change="changePage"
            />
        </div>
    </div>
</template>

<style scoped lang="less">
.item-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .item {
        overflow: hidden;
        margin: 20px;
        box-shadow: 0 0 10px #00000033;
        border-radius: 14px;
        background-color: white;
        transition: 300ms;
        &:hover {
            transform: translateY(-4px);
        }
    }
    .card {
        width: 240px;
        height: 300px;
        padding: 10px 20px;
        background-image: var(--bg-url);
        background-size: cover;

        display: flex;
        flex-direction: column-reverse;
        .item-content {
            margin: -20px;
            padding: 10px 10px 30px 10px;
        }
        .flex-center {
            display: flex;
            justify-content: center;
        }

        position: relative;
        .pin {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
}
.acrylic {
    backdrop-filter: blur(20px);
}
</style>
