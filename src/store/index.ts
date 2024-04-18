import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useUserStore from './modules/user'
import useStoreAnswer from './modules/answer'
import useSurveyStore from './modules/survey'
// import useTabBarStore from './modules/tab-bar'

const pinia = createPinia()

export {
    useAppStore,
    useUserStore,
    useStoreAnswer,
    useSurveyStore,
    /* , useTabBarStore */
}
export default pinia
