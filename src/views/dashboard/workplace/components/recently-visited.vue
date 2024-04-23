<script lang="ts" setup>
import { useAppStore } from '@/store';
</script>

<template>
    <a-card
        class="general-card"
        :title="$t('最近访问')"
        :header-style="{ paddingBottom: '0' }"
        :body-style="{ paddingTop: '26px' }"
    >
        <div style="margin-bottom: -1rem">
            <a-row :gutter="8">
                <a-empty v-if="useAppStore().$state.lastRouter.length < 1" />
                <a-col
                    v-for="link in useAppStore().$state.lastRouter"
                    :key="link.text"
                    :span="8"
                    class="wrapper"
                    @click="() => $router.push({ name: link.name })"
                >
                    <div class="icon">
                        <component :is="link.icon" />
                    </div>
                    <a-typography-paragraph class="text">
                        {{ $t(link.text) }}
                    </a-typography-paragraph>
                </a-col>
            </a-row>
        </div>
    </a-card>
</template>

<style lang="less" scoped>
:deep(.arco-card-header-title) {
    line-height: inherit;
}
</style>
