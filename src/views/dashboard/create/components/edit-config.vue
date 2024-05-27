<script setup lang="ts">
import { useCreateStore } from '@/store';
const createStore = useCreateStore();
</script>
<template>
    <div class="container">
        <a-space direction="vertical" fill>
            <a-space wrap>
                <p>{{ $t('是否定时缓存问卷到云端') }}</p>
                <a-switch v-model="createStore.config.autoCacheSurvey" type="round">
                    <template #checked>
                        {{ $t('自动') }}
                    </template>
                    <template #unchecked>
                        {{ $t('手动') }}
                    </template>
                </a-switch>
            </a-space>
            <a-space wrap>
                <p>{{ $t('是否自动关闭添加问题面板？') }}</p>
                <a-switch v-model="createStore.config.autoCloseAddPanel" type="round">
                    <template #checked>
                        {{ $t('自动') }}
                    </template>
                    <template #unchecked>
                        {{ $t('手动') }}
                    </template>
                </a-switch>
            </a-space>
            <a-space wrap>
                <p>{{ $t('删除问题前是否提示警告信息：') }}</p>
                <a-switch v-model="createStore.config.confirmBeforeDel" type="round">
                    <template #checked>
                        {{ $t('已开启') }}
                    </template>
                    <template #unchecked>
                        {{ $t('已关闭') }}
                    </template>
                </a-switch>
            </a-space>
            <a-space wrap>
                <p>{{ $t('是否允许删除最后一个问题') }}</p>
                <a-switch v-model="createStore.config.canDelLastQuestion" type="round">
                    <template #checked>
                        {{ $t('允许') }}
                    </template>
                    <template #unchecked>
                        {{ $t('不允许') }}
                    </template>
                </a-switch>
            </a-space>
            <a-space wrap>
                <p>{{ $t('是否允许删除最后一个选项') }}</p>
                <a-switch v-model="createStore.config.canDelLastOption" type="round">
                    <template #checked>
                        {{ $t('允许') }}
                    </template>
                    <template #unchecked>
                        {{ $t('不允许') }}
                    </template>
                </a-switch>
            </a-space>
        </a-space>
    </div>
</template>
