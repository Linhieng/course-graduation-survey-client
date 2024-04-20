import { defineStore } from 'pinia';
import { CreateState } from './types';
import bgImg from '@/assets/images/login1.png';

const useCreateStore = defineStore('create', {
    state: (): CreateState => ({
        skin: {
            survey_position: 'left',
            background_image: bgImg,
            background_image_position: 'right',
        },
    }),

    getters: {},

    actions: {},
});

export default useCreateStore;
