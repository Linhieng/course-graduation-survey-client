import { defineStore } from 'pinia';
import { CreateState } from './types';
import bgImg from '@/assets/images/login1.png';

const useCreateStore = defineStore('create', {
    state: (): CreateState => ({
        skin: {
            survey_width: '60%',
            survey_position: 'left',
            background_image: bgImg,
            background_image_position: 'right',
            bg_object_fit: 'cover',
            bg_position: 'reset',
            bg_width: undefined,
            bg_color: undefined,
        },
    }),

    getters: {},

    actions: {
        updateBgUrl(url: string) {
            this.skin.background_image = url;
        },
        updateBgWidth(val: string) {
            this.skin.bg_width = val;
        },
        resetBgWidth() {
            this.skin.bg_width = undefined;
        },
        resetBgPosition() {
            this.skin.bg_position = 'reset';
        },
        updateBgColor(val: string) {
            this.skin.bg_color = val;
        },
        updateSurveyWidth(val: string) {
            this.skin.survey_width = val;
        },
    },
});

export default useCreateStore;
