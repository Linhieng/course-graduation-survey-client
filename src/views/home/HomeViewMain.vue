<script setup lang="ts">
import IconEdit from '@/components/icons/IconEdit.vue'
import IconCopy from '@/components/icons/IconCopy.vue'
import IconDel from '@/components/icons/IconDel.vue'
import IconDelRedo from '@/components/icons/IconDelRedo.vue'
import IconStat from '@/components/icons/IconStat.vue'
import IconPublish from '@/components/icons/IconPublish.vue'
import IconStop from '@/components/icons/IconStop.vue'
import bgImg from '@/assets/img/survey-bg.png'
import { useStoreHome } from '@/stores'

const storeHome = useStoreHome()
const isFetch = storeHome.gerIsFetchRef()
const showSurveys = storeHome.getValidSurveyRef()
const toChangeSurvey = storeHome.toChangeSurvey
const copyLink = storeHome.copyLink
const deleteSurvey = storeHome.deleteSurvey
const toggleSurveyValid = storeHome.toggleSurveyValid
const toStatAnswer = storeHome.toStatAnswer

storeHome.fetchAllSurvey()
</script>

<template>
    <div class="surveys-container">
        <template v-if="isFetch"> 加载中…… </template>
        <template v-else>
            <div
                v-for="survey of showSurveys"
                class="surveys-item"
                :key="survey.id"
                :class="{ is_draft: survey.is_draft }"
            >
                <div class="base-info">
                    <div class="bg-box">
                        <img :src="bgImg" alt="没啥用的背景图片" />
                    </div>
                    <p>标题：{{ survey.title }}</p>
                    <p v-if="survey.comment && survey.comment !== ''">
                        <el-text truncated>
                            备注：{{ survey.comment }}
                        </el-text>
                    </p>
                    <p>
                        创建时间：{{
                            new Date(survey.created_at).toLocaleString()
                        }}
                    </p>
                    <p>
                        更新时间：{{
                            new Date(survey.updated_at).toLocaleString()
                        }}
                    </p>
                </div>
                <div class="btn-options">
                    <el-tooltip content="编辑问卷" :hide-after="0">
                        <p
                            class="btn-option flex-all-center"
                            @click="
                                () => {
                                    toChangeSurvey(survey)
                                }
                            "
                            title="编辑问卷"
                        >
                            <el-icon size="20">
                                <IconEdit />
                            </el-icon>
                        </p>
                    </el-tooltip>
                    <el-tooltip
                        :content="
                            survey.is_deleted ? '从回收站中恢复' : '移入回收站'
                        "
                        :hide-after="0"
                    >
                        <p
                            class="btn-option flex-all-center"
                            @click="
                                () => {
                                    deleteSurvey(survey)
                                }
                            "
                            :title="
                                survey.is_deleted
                                    ? '从回收站中恢复'
                                    : '移入回收站'
                            "
                        >
                            <template v-if="survey.is_deleted">
                                <el-icon size="20">
                                    <IconDelRedo />
                                </el-icon>
                            </template>
                            <template v-else>
                                <el-icon size="20">
                                    <IconDel />
                                </el-icon>
                            </template>
                        </p>
                    </el-tooltip>
                    <el-tooltip content="统计数据" :hide-after="0">
                        <p
                            class="btn-option flex-all-center"
                            @click="
                                () => {
                                    toStatAnswer(survey)
                                }
                            "
                            title="统计数据"
                        >
                            <el-icon size="20">
                                <IconStat />
                            </el-icon>
                        </p>
                    </el-tooltip>
                    <el-tooltip
                        :content="survey.is_valid ? '停止收集' : '发布问卷'"
                        :hide-after="0"
                    >
                        <p
                            class="btn-option flex-all-center"
                            @click="
                                () => {
                                    toggleSurveyValid(survey)
                                }
                            "
                            :title="survey.is_valid ? '停止收集' : '发布问卷'"
                        >
                            <template v-if="survey.is_valid">
                                <el-icon size="20">
                                    <IconStop />
                                </el-icon>
                            </template>
                            <template v-else>
                                <el-icon size="20">
                                    <IconPublish />
                                </el-icon>
                            </template>
                        </p>
                    </el-tooltip>
                    <el-tooltip content="复制问卷链接" :hide-after="0">
                        <p
                            class="btn-option flex-all-center"
                            @click="
                                () => {
                                    copyLink(survey)
                                }
                            "
                            title="复制问卷链接"
                        >
                            <el-icon size="20">
                                <IconCopy />
                            </el-icon>
                        </p>
                    </el-tooltip>
                </div>
            </div>
            <div v-if="showSurveys && showSurveys.length < 1">
                <el-empty description="您还没有创建过问卷" />
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.top-filter {
    width: 100%;
    overflow: auto;
}

.surveys-container {
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .surveys-item {
        max-width: 350px;
        padding: 20px;
        box-shadow: 0 0 20px 0 #eee;
        margin: 10px;
        background-color: white;
        border-radius: 4px;
    }
}

.base-info {
    display: flex;
    flex-direction: column;

    .bg-box {
        width: 250px;
        margin-bottom: 10px;
        img {
            width: 100%;
        }
    }
    & > p {
        margin-bottom: 10px;
        font-size: 1.1rem;
        color: black;

        span {
            font-size: inherit;
            color: inherit;
        }
    }
}

.btn-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .btn-option {
        flex: 1 1 auto;
        min-width: max-content;
        padding: 4px;
        margin: 4px;
        text-decoration: underline;
        cursor: pointer;

        &:hover {
            box-shadow: 0 0 4px #ddd;
        }
    }
}
</style>
