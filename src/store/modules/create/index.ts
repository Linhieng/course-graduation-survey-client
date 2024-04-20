import { defineStore } from 'pinia';
import { CreateState } from './types';
import bgImg from '@/assets/images/login1.png';

const useCreateStore = defineStore('create', {
    state: (): CreateState => ({
        skin: {
            survey_position: 'left',
            background_image: bgImg,
            background_image_position: 'right',
            bg_object_fit: 'cover',
            bg_position: 'centerCenter',
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
        updateBgColor(val: string) {
            this.skin.bg_color = val;
        },
    },
});

export default useCreateStore;
