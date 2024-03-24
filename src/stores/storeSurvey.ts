import { apiCacheSurvey, apiGetSurveyById } from '@/api'
import { STATUS_FAILED, STATUS_SUCCEED } from '@/constants'
import type { Survey } from '@/types'
import { msgError, noticeError, saveFile } from '@/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreSurvey = defineStore('storeSurvey', () => {
    const surveyId = ref()
    const survey = ref()
    const newCacheTime = ref()
    const isFetching = ref(false)

    /** 更新 ID 后，自动更新 survey 内容  */
    const setSurveyId = (id: number) => {
        surveyId.value = id
        updateSurvey()
    }

    const updateSurvey = async (successCb?: (survey:Survey)=>void, errorCb?: (reason:string)=>void) => {
        const resData = await apiGetSurveyById(surveyId.value)
        if (resData.status === STATUS_FAILED) {
            msgError(resData.msg)
            errorCb && errorCb(resData.msg)
            return
        }
        survey.value = resData.data
        successCb && successCb(resData.data)
    }

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
        setSurveyId,
        updateSurvey,
        setSurvey,
        importSurvey,
        setNewCacheTime,
        cacheSurvey,
        // actions
        exportSurvey,
    }
})
