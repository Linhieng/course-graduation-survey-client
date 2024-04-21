<script setup lang="ts">
import { useCreateStore } from '@/store';
const createStore = useCreateStore();
</script>
<template>
    <div class="container">
        <a-space direction="vertical" fill>
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
        </a-space>
    </div>
</template>
