<template>
    <a-card class="general-card" :title="$t('操作日志')">
        <!-- <template #extra>
            <a-link>{{ $t('查看全部') }}</a-link>
        </template> -->
        <a-list :bordered="false">
            <a-list-item v-for="activity in activityList" :key="activity.id" action-layout="horizontal">
                <a-skeleton v-if="loading" :loading="loading" :animation="true" class="skeleton-item">
                    <a-row :gutter="6">
                        <a-col :span="2">
                            <a-skeleton-shape shape="circle" />
                        </a-col>
                        <a-col :span="22">
                            <a-skeleton-line :widths="['40%', '100%']" :rows="2" />
                        </a-col>
                    </a-row>
                </a-skeleton>
                <a-list-item-meta v-else>
                    <template #avatar>
                        <a-avatar :imageUrl="useUserStore().userInfo.avatar" object-fit="cover"></a-avatar>
                    </template>
                    <template #title>
                        <p>
                            {{
                                $t('行为：') +
                                activity.info +
                                $t('； 时间：') +
                                new Date(activity.created_at).toLocaleString()
                            }}
                        </p>
                    </template>
                    <template #description>
                        <a-descriptions
                            :data="[{ label: $t('IP地址'), value: activity.ip }, ...showUA(activity.user_agent)]"
                            bordered
                        />
                    </template>
                </a-list-item-meta>
            </a-list-item>
        </a-list>
    </a-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useLoading from '@/hooks/loading';
import { UserActionLog, getUserActionLog } from '@/api/user';
import { msgError } from '@/utils/msg';
import { useUserStore } from '@/store';
import { useI18n } from 'vue-i18n';
import UAParser from 'ua-parser-js';
import { DescData } from '@arco-design/web-vue';

const { t } = useI18n();
const { loading, setLoading } = useLoading(true);
const activityList = ref<UserActionLog[]>(new Array(7).fill({}));

const getUserActionLately = async () => {
    setLoading(true);

    const res = await getUserActionLog(0, 7);
    if (res.ok) {
        activityList.value = res.data;
    } else {
        msgError(res.msg);
    }
    setLoading(false);
};
getUserActionLately();

function showUA(userAgent: string) {
    const ua = new UAParser().setUA(userAgent);

    const show: DescData[] = [];
    const device = ua.getDevice().vendor;
    const os = ua.getOS().name;
    const browser = ua.getBrowser().name;
    if (device) {
        show.push({
            label: t('设备'),
            value: device,
        });
    }
    if (os) {
        show.push({
            label: t('操作系统'),
            value: os,
        });
    }
    if (browser) {
        show.push({
            label: t('浏览器'),
            value: browser,
        });
    }

    return show;
}
</script>

<style scoped lang="less">
.latest-activity {
    &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
.general-card :deep(.arco-list-item) {
    padding-left: 0;
    border-bottom: none;
    .arco-list-item-meta-content {
        flex: 1;
        padding-bottom: 27px;
        border-bottom: 1px solid var(--color-neutral-3);
    }
    .arco-list-item-meta-avatar {
        padding-bottom: 27px;
    }
    .skeleton-item {
        margin-top: 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--color-neutral-3);
    }
}
</style>
