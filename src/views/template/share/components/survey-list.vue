<script setup lang="ts">
import { getSurveyAllTemplate, getSurveyMyTemplate } from '@/api/survey';
import { reactive, ref } from 'vue';
import useLoading from '@/hooks/loading';
import { useRouter } from 'vue-router';
import { useCreateStore, useUserStore } from '@/store';
import { Survey } from '@/store/modules/create/types';
import bg2 from '@/assets/images/bg2.png';
import { getUserAvatar } from '@/api/user';
const router = useRouter();
const createStore = useCreateStore();
const useStore = useUserStore();

const { loading: fetching, setLoading: setFetching } = useLoading();
const surveyList = ref<Survey[]>(Array(8).fill([]) as any);
const page = reactive({
    total: 0,
    cur: 1,
    size: 8,
});
const gotoId = ref();
const gotoLoading = ref(false);
const avatarArr = ref<{ [key: number]: string }>({});

fetchMySurveyTemplate();
async function fetchMySurveyTemplate() {
    if (fetching.value) return;
    setFetching(true);
    const res = await getSurveyAllTemplate(page.cur, page.size);
    if (res.ok) {
        surveyList.value = res.data.surveyTemplate;
        page.total = res.data.count;
        page.cur = res.data.pageStart;
        page.size = res.data.pageSize;
        const set = new Set<number>();
        res.data.surveyTemplate.forEach((item) => {
            set.add(item.creator_id as number);
        });
        set.forEach(async (id) => {
            const res = await getUserAvatar(id);
            if (res.ok) {
                avatarArr.value[id] = res.data.avatar;
            }
        });
    }
    setFetching(false);
}

async function gotoUseSurvey(id: number) {
    if (gotoLoading.value) return;
    gotoId.value = id;
    gotoLoading.value = true;
    await createStore.importFromTemplate(id);
    gotoLoading.value = false;
    router.push({ name: 'Create' });
}

async function changePageSize(pageSize: number) {
    if (pageSize === page.size) return;
    page.cur = 1;
    page.size = pageSize;
    changePage(page.cur);
}
async function changePage(current: number) {
    if (fetching.value) return;
    page.cur = current;
    fetchMySurveyTemplate();
}
</script>

<template>
    <div class="container">
        <a-button @click="() => fetchMySurveyTemplate()" :loading="fetching">刷新</a-button>
        <a-empty style="height: 300px" v-if="surveyList.length < 1"></a-empty>
        <div class="item-box">
            <div class="item" v-for="item in surveyList">
                <a-spin :loading="fetching" dot>
                    <div class="card" :style="{ '--bg-url': `url(${bg2})` }">
                        <div class="pin">
                            <a-tag color="green">
                                <a-space size="mini">
                                    <icon-font name="public" />
                                    {{ $t('共享模版') }}
                                </a-space>
                            </a-tag>
                        </div>
                        <div class="pin-right">
                            <a-tag>{{ item.id }}</a-tag>
                        </div>
                        <a-space direction="vertical" fill class="item-content acrylic">
                            <a-space>
                                <a-avatar
                                    :image-url="avatarArr[item.creator_id as number]"
                                    object-fit="cover"
                                    style="width: 30px; height: 30px"
                                ></a-avatar>
                                <p>{{ item.title }}</p>
                            </a-space>
                            <div class="flex-center">
                                <a-button
                                    :loading="gotoLoading && gotoId === item.id"
                                    :disabled="gotoLoading"
                                    type="primary"
                                    @click="() => gotoUseSurvey(item.id as number)"
                                >
                                    使用该模版
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
        .pin-right {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
}
.acrylic {
    backdrop-filter: blur(20px);
}

.pagination-box {
    padding-right: 30px;
    display: flex;
    flex-direction: row-reverse;
}
</style>
