<template>
    <a-card
        class="general-card"
        :title="$t('功能特性')"
        :header-style="{ paddingBottom: '0' }"
        :body-style="{ padding: '15px 20px 13px 20px' }"
    >
        <div>
            <div v-for="(item, idx) in list" :key="idx" class="item">
                <a-tag :color="item.type" size="small">{{ $t(item.label) }}</a-tag>
                <a-tooltip :content="$t(item.content)" position="left">
                    <span class="item-content">
                        {{ $t(item.content) }}
                    </span>
                </a-tooltip>
            </div>
        </div>
    </a-card>
</template>

<script lang="ts" setup>
const list = [
    {
        type: 'orangered',
        label: '模版',
        content: '提供私有和共享问卷模版市场',
    },
    {
        type: 'cyan',
        label: '统计',
        content: '提供了多维度的数据分析图表',
    },
    {
        type: 'blue',
        label: '排行榜',
        content: '提供问卷排行榜共用户快捷查看与分析',
    },
    {
        type: 'blue',
        label: '皮肤',
        content: '编辑问卷界面提供了丰富的皮肤功能',
    },
    {
        type: 'cyan',
        label: 'Ai 助手',
        content: '答案统计页面提供了 AI 助手帮助用户分析',
    },
];
</script>

<style scoped lang="scss">
.item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 24px;
    margin-bottom: 4px;
    .item-content {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 4px;
        color: var(--color-text-2);
        text-decoration: none;
        font-size: 13px;
        cursor: pointer;
    }
}
</style>
