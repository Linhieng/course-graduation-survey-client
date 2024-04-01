import { apiGetStatData } from "@/api"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useStoreStat = defineStore('storeStat', () => {
    const surveyId = ref()

    function setSurveyId(id: number|string) {
        surveyId.value = Number(id)
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
