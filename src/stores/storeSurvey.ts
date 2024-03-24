import { saveFile } from '@/utils'
import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useStoreSurvey = defineStore('storeSurvey', () => {
    const survey = ref()
    const newCacheTime = ref()

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
        // actions
        exportSurvey,
    }
})
