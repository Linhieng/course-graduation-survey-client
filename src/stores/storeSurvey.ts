import { saveFile } from '@/utils'
import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useStoreSurvey = defineStore('storeSurvey', () => {
    const survey = ref()

    const getSurvey = () => {
        return survey.value
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
        // getter
        getSurvey,
        // settter
        setSurvey,
        importSurvey,
        // actions
        exportSurvey,
    }
})
