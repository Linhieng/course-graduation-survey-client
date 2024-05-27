<script setup lang="ts">
import BaseContainer from '@/components/base-container/index.vue';
import { ref } from 'vue';
import ListView from './list-view.vue';
import AppsView from './apps-view.vue';
import { reloadRouter } from '@/router/util';
import { useRouter } from 'vue-router';

const router = useRouter();
const showType = ref<'list' | 'apps'>('list');

const reload = async () => {
    await reloadRouter(router);
};
</script>
<template>
    <base-container :items="['我的问卷', '已停止问卷']" title="所有已经停止回收的问卷">
        <a-row justify="end" :gutter="16">
            <a-col flex="240px">
                <!-- <a-input-search :placeholder="$t('输入问卷 id')" /> -->
            </a-col>
            <a-col flex="30px">
                <a-button shape="circle" @click="reload">
                    <template #icon>
                        <icon-refresh />
                    </template>
                </a-button>
            </a-col>
            <a-col flex="100px">
                <a-radio-group type="button" v-model="showType">
                    <a-radio value="list"><icon-list /></a-radio>
                    <a-radio value="apps"><icon-apps /></a-radio>
                </a-radio-group>
            </a-col>
        </a-row>
        <div class="content">
            <div v-show="showType === 'list'">
                <list-view />
            </div>
            <div v-show="showType === 'apps'">
                <apps-view />
            </div>
        </div>
    </base-container>
</template>

<style scoped lang="scss">
.content {
    margin-top: 10px;
}
</style>
