<script setup lang="ts">
import { apiNewSurvey } from '@/api'
import { STATUS_SUCCEED } from '@/constants'
import { msgError } from '@/utils'
import IconAdd from '@icon/IconAdd.vue'
import IconFolder from '@icon/IconFolder.vue'
import IconStat from '@icon/IconStat.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const toCreate = async () => {
    const data = await apiNewSurvey()
    if (data.status === STATUS_SUCCEED) {
        router.push({
            name: 'create',
            params: { id: data.data.surveyId },
        })
    } else {
        msgError(data.msg)
    }
}
</script>

<template>
    <div class="route-container">
        <RouterLink to="/" class="route-item flex-align-center">
            <el-icon size="20">
                <IconFolder />
            </el-icon>
            <p class="flex-align-center-left ml-5">我的问卷</p>
        </RouterLink>
        <div @click="toCreate" class="route-item flex-align-center">
            <el-icon size="20">
                <IconAdd />
            </el-icon>
            <p class="flex-align-center-left ml-5">新建问卷</p>
        </div>
        <RouterLink to="/stat" class="route-item flex-align-center">
            <el-icon size="20">
                <IconStat />
            </el-icon>
            <p class="flex-align-center-left ml-5">数据分析</p>
        </RouterLink>
    </div>
</template>

<style scoped lang="scss">
.route-container {
    display: grid;
    grid-template-rows: repeat(3, 60px);

    .route-item {
        width: 100%;
        height: 100%;
        cursor: pointer;
        color: black;
        padding-left: 1rem;

        transition:
            color var(--td-fast),
            background-color var(--td-base);
    }

    .route-item:hover {
        color: white;
        background-color: var(--c-main-5);
    }
}
</style>
