import {
    apiGetAllSurveys,
    apiToggleSurveyDelete,
    apiToggleSurveyValid,
} from '@/api'
import { STATUS_SUCCEED } from '@/constants'
import type { OneSurvey } from '@/types'
import { copyToClipboard, msgSuccess, msgWarning } from '@/utils'
import { defineStore } from 'pinia'
import { ref, watch, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export const useStoreHome = defineStore('storeHome', () => {
    const allSurvey = ref<OneSurvey[]>()
    const validSurvey = ref<OneSurvey[]>()
    const dumpSurvey = ref<OneSurvey[]>()
    const showSurvey = ref<OneSurvey[]>()
    const router = useRouter()
    const route = useRoute()
    const isFetch = ref(true)

    // TODO: 更新的这一步操作，会阻塞页面，怎么解决？
    const updateShowSurvey = async () => {
        isFetch.value = true
        if (route.path === '/dump') {
            showSurvey.value = dumpSurvey.value
        } else {
            showSurvey.value = validSurvey.value
        }
        isFetch.value = false
    }

    watch(route, (to, from) => {
        updateShowSurvey()
    })

    const gerIsFetchRef = () => {
        return isFetch
    }
    const getDumpSurveyRef = () => {
        return dumpSurvey
    }
    const getValidSurveyRef = () => {
        return showSurvey
    }
    const getAllSurveyRef = () => {
        return allSurvey
    }
    /** 区分出已删除和未删除的问卷 */
    function filterValidSurvey() {
        const dump = [] as OneSurvey[]
        validSurvey.value = allSurvey.value?.filter((survey) => {
            if (!survey.is_deleted) return true
            dump.push(survey)
        })
        dumpSurvey.value = dump
        updateShowSurvey()
    }
    /** 从服务器获取问卷统统使用该入口！ */
    async function fetchAllSurvey() {
        isFetch.value = true
        const data = await apiGetAllSurveys()
        isFetch.value = false
        if (data.status === STATUS_SUCCEED) {
            allSurvey.value = data.data.all_surveys
            filterValidSurvey()
        }
    }

    const toChangeSurvey = (survey: OneSurvey) => {
        if (!survey.is_draft) {
            msgWarning('已发布的问卷不允许修改，请重新创建')
            return
        }
        router.push({
            name: 'create',
            params: { id: survey.id },
        })
    }

    const copyLink = (survey: OneSurvey) => {
        const link = `http://localhost:5173/answer/${survey.id}`
        copyToClipboard(link)
        msgSuccess(`已复制： ${link}`)
    }

    const deleteSurvey = async (survey: OneSurvey) => {
        isFetch.value = true
        await apiToggleSurveyDelete(survey.id, true)
        fetchAllSurvey()
    }

    const toggleSurveyValid = async (survey: OneSurvey) => {
        isFetch.value = true
        await apiToggleSurveyValid(survey.id)
        fetchAllSurvey()
    }

    const toStatAnswer = (survey: OneSurvey) => {
        router.push({
            name: 'stat',
            params: {
                surveyId: survey.id,
            },
        })
    }

    return {
        isFetch,
        allSurvey,
        validSurvey,
        dumpSurvey,
        gerIsFetchRef,
        fetchAllSurvey,
        getDumpSurveyRef,
        getValidSurveyRef,
        getAllSurveyRef,
        toChangeSurvey,
        copyLink,
        deleteSurvey,
        toggleSurveyValid,
        toStatAnswer,
    }
})
