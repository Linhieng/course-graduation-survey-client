import { apiCacheSurvey } from '@/api'
import { STATUS_SUCCEED } from '@/constants'
import { noticeError, saveFile } from '@/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreSurvey = defineStore('storeSurvey', () => {
    const survey = ref()
    const newCacheTime = ref()
    const isFetching = ref(false)

    const getSurvey = () => {
        return survey.value
    }
    // const getNewCacheTime = () => {
    //     return newCacheTime.value
    // }
    const setNewCacheTime = (time: Date) => {
        newCacheTime.value = time
        return time
    }

    const cacheSurvey = async () => {
        if (isFetching.value) return

        isFetching.value = true
        const reqData = JSON.parse(JSON.stringify({
            id: survey.value.id,
            title: survey.value.title,
            comment: survey.value.comment,
            structure_json: {
                version: '0.0.1',
                questions: survey.value.questions
            }
        }))
        const resData = await apiCacheSurvey(reqData)
        if (resData.status === STATUS_SUCCEED) {
            setNewCacheTime(new Date(resData.data.time))
        } else {
            noticeError(resData.msg)
        }
        isFetching.value = false
    }

    const setSurvey = (_survey: any) => {
        survey.value = _survey
    }
    const importSurvey = (_survey: any) => {
        survey.value = _survey
        return _survey
    }
    const exportSurvey = () => {
    }

    return {
        // data
        survey,
        newCacheTime,
        // getter
        getSurvey,
        // getNewCacheTime,
        // settter
        setSurvey,
        importSurvey,
        setNewCacheTime,
        cacheSurvey,
        // actions
        exportSurvey,
    }
})
