<script lang="ts" setup>
import icon1 from '@/assets/images/i1.png';
import icon2 from '@/assets/images/i2.png';
import icon3 from '@/assets/images/i3.png';
import icon4 from '@/assets/images/i4.png';
import { useStatStore } from '@/store';
useStatStore().getStatCount();
const stat = useStatStore();
</script>

<template>
    <a-grid :cols="24" :row-gap="16" class="panel">
        <a-grid-item class="panel-col" :span="{ xs: 24, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img alt="avatar" :src="icon1" />
                </a-avatar>
                <a-statistic
                    :title="$t('总问卷')"
                    :value="stat.state.statCount.count_all_survey"
                    :precision="0"
                    :value-from="99999"
                    animation
                    show-group-separator
                >
                    <template #suffix>
                        <span class="unit">{{ $t('份') }}</span>
                        <icon-caret-up class="up-icon" />
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 24, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img alt="avatar" :src="icon2" />
                </a-avatar>
                <a-statistic
                    :title="$t('收集中')"
                    :value="stat.state.statCount.count_publish_survey"
                    :value-from="99999"
                    animation
                    show-group-separator
                >
                    <template #suffix>
                        <span class="unit">{{ $t('份') }}</span>
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 24, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img alt="avatar" :src="icon3" />
                </a-avatar>
                <a-statistic
                    :title="$t('已停止')"
                    :value="stat.state.statCount.count_stop_survey"
                    :value-from="99999"
                    animation
                    show-group-separator
                >
                    <template #suffix>
                        <span class="unit">{{ $t('份') }}</span>
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 24, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
            <a-space>
                <a-avatar :size="54" class="col-avatar">
                    <img alt="avatar" :src="icon4" />
                </a-avatar>
                <a-statistic
                    :title="$t('总回答')"
                    :value="stat.state.statCount.count_all_answer"
                    :precision="0"
                    :value-from="99999"
                    animation
                >
                    <template #suffix>
                        <span class="unit">{{ $t('份') }}</span>
                        <icon-caret-up class="up-icon" />
                    </template>
                </a-statistic>
            </a-space>
        </a-grid-item>
        <a-grid-item :span="24">
            <a-divider class="panel-border" />
        </a-grid-item>
    </a-grid>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
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
