import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useUserStore from './modules/user'
import useStoreAnswer from './modules/answer'
import useSurveyStore from './modules/survey'
import { useStoreStat } from './modules/stat'
// import useTabBarStore from './modules/tab-bar'

const pinia = createPinia()

export {
    useAppStore,
    useUserStore,
    useStoreAnswer,
    useSurveyStore,
    useStoreStat,
    /* , useTabBarStore */
}
export default pinia
