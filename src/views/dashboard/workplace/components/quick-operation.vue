<template>
    <a-card
        class="general-card"
        :title="$t('workplace.quick.operation')"
        :header-style="{ paddingBottom: '0', paddingTop: '0' }"
        :body-style="{ padding: '14px 20px 0 20px' }"
    >
        <template #extra>
            <!-- <a-link>{{ $t('workplace.quickOperation.setup') }}</a-link> -->
        </template>
        <a-row :gutter="8">
            <a-col
                v-for="link in links"
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
        <a-divider class="split-line" style="margin: 0" />
    </a-card>
</template>

<script lang="ts" setup>
const links = [
    { name: 'create-entry', text: '创建', icon: 'icon-file' },
    { name: 'collect-entry', text: '统计', icon: 'icon-eye' },
    { name: 'template-my', text: '模版', icon: 'icon-file' },
];
</script>

<style scoped lang="less"></style>
