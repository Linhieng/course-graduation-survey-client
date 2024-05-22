<template>
    <a-card
        class="general-card"
        :title="$t('快捷入口')"
        :header-style="{ paddingBottom: '0' }"
        :body-style="{ padding: '24px 20px 0 20px' }"
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
    { name: 'Create', text: '创建问卷', icon: 'icon-file' },
    { name: 'collect-entry', text: '答案统计', icon: 'icon-file' },
    { name: 'my-draft-survey', text: '问卷草稿箱', icon: 'icon-storage' },
    { name: 'my-publish-survey', text: '已发布的问卷', icon: 'icon-file' },
    { name: 'my-stop-survey', text: '已停止的问卷', icon: 'icon-fire' },
    { name: 'Info', text: '行为日志', icon: 'icon-eye' },
    { name: 'Setting', text: '个人设置', icon: 'icon-settings' },
];
</script>

<style scoped lang="less"></style>
