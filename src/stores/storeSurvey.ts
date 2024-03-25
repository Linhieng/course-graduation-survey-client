import { apiCacheSurvey, apiGetSurveyById } from '@/api'
import { STATUS_FAILED, STATUS_SUCCEED } from '@/constants'
import type { Survey } from '@/types'
import { msg, msgError, noticeError, saveFile, unrefRecursion } from '@/utils'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

type WrapWithRef<T> = {
    [K in keyof T]: Ref<T[K]>
}

export const useStoreSurvey = defineStore('storeSurvey', () => {
    const surveyId = ref()
    const survey = ref<Survey>()
    const newCacheTime = ref()
    const isFetching = ref(false)
    const router = useRouter()

    // 存储获取 survey 后，需要执行的操作
    let tasks: Function[] = []

    // 供组件注册 task，当获取到 survey 后就会执行
    const addTask = (cb: (survey: Ref<Survey | undefined>) => void) => {
        tasks.push(() => cb(survey))
    }
    // 执行 tasks 中的任务，然后清空 task
    const executeTasks = () => {
        tasks.forEach(task => {
            task()
        })
        tasks = []
    }
    const getSurveyRef = () => {
        return survey
    }

    /** 更新 ID 后，自动更新 survey 内容  */
    const setSurveyId = (id: number | string) => {
        id = Number(id)
        if (Number.isNaN(id)) {
            router.replace({ name: 'home' })
            msg('问卷 id 错误')
            return
        }
        surveyId.value = id
        updateSurvey()
    }

    const updateSurvey = async (successCb?: (survey: Survey) => void, errorCb?: (reason: string) => void) => {
        const resData = await apiGetSurveyById(surveyId.value)
        if (resData.status === STATUS_FAILED) {
            msgError(resData.msg)
            errorCb && errorCb(resData.msg)
            return
        }

        survey.value = {
            id:  resData.data.id,
            comment: resData.data.comment,
            title: resData.data.title,
            version: resData.data.questions.version,
            questions: resData.data.questions.questions
        }
        successCb && successCb(survey.value)
        executeTasks()
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
            id: surveyId.value,
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
        // survey.value = _survey
    }

    // 导入问卷模版
    const importSurvey = (_survey: Survey) => {
        _survey.id = surveyId.value
        survey.value = _survey
        return survey
    }
    // 导出问卷模版
    const exportSurvey = () => {
        const _survey = unrefRecursion(survey)
        const jsonStr = JSON.stringify(_survey, null, 4)
        saveFile(jsonStr, `问卷模版 - ${_survey.title}.json`)
    }


    return {
        getSurveyRef,
        addTask,
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////

        // data
        surveyId,
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
