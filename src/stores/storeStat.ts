import { apiGetStatData } from "@/api"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useStoreStat = defineStore('storeStat', () => {
    const surveyId = ref()

    function setSurveyId(id: number) {
        surveyId.value = id
        fetchStatData()
    }

    async function fetchStatData() {
        apiGetStatData(surveyId.value)
    }

    return {
        surveyId,
        setSurveyId,
    }
})
