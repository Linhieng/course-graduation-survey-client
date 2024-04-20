<script lang="ts" setup>
import icon3 from '@/assets/images/i1.png';
import icon2 from '@/assets/images/i2.png';
import icon1 from '@/assets/images/i3.png';
import icon4 from '@/assets/images/i4.png';
</script>

<template>
    <a-grid :cols="24" :row-gap="16" class="panel">
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img alt="avatar" :src="icon3" />
                </a-avatar>
                <a-statistic
                    :title="$t('问卷数量')"
                    :value="373.5"
                    :precision="1"
                    :value-from="0"
                    animation
                    show-group-separator
                >
                    <template #suffix>
                        <span class="unit">{{ $t('份') }}</span>
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img alt="avatar" :src="icon2" />
                </a-avatar>
                <a-statistic :title="$t('收集中')" :value="368" :value-from="0" animation show-group-separator>
                    <template #suffix>
                        <span class="unit">{{ $t('份') }}</span>
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img alt="avatar" :src="icon1" />
                </a-avatar>
                <a-statistic :title="$t('新增回答')" :value="8874" :value-from="0" animation show-group-separator>
                    <template #suffix>
                        <span class="unit">{{ $t('份') }}</span>
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
            style="border-right: none"
        >
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img alt="avatar" :src="icon4" />
                </a-avatar>
                <a-statistic
                    :title="$t('workplace.newFromYesterday')"
                    :value="2.8"
                    :precision="1"
                    :value-from="0"
                    animation
                >
                    <template #suffix> % <icon-caret-up class="up-icon" /> </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item :span="24">
            <a-divider class="panel-border" />
        </a-grid-item>
    </a-grid>
</template>

<style lang="less" scoped>
.arco-grid.panel {
    margin-bottom: 0;
    padding: 16px 20px 0 20px;
}
.panel-col {
    padding-left: 43px;
    border-right: 1px solid rgb(var(--gray-2));
}
.col-avatar {
    margin-right: 12px;
    background-color: var(--color-fill-2);
}
.up-icon {
    color: rgb(var(--red-6));
}
.unit {
    margin-left: 8px;
    color: rgb(var(--gray-8));
    font-size: 12px;
}
:deep(.panel-border) {
    margin: 4px 0 0 0;
}
</style>
