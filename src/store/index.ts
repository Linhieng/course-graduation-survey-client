import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useUserStore from './modules/user'
import useStoreAnswer from './modules/answer'
import { useStoreSurvey } from './modules/survey'
// import useTabBarStore from './modules/tab-bar'

const pinia = createPinia()

export {
    useAppStore,
    useUserStore,
    useStoreAnswer,
    useStoreSurvey /* , useTabBarStore */,
}
export default pinia
