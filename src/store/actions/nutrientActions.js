import { nutrientConsts } from '../consts';

export const setNutrients = (nutrients) => ({
    type: nutrientConsts.SET_NUTRIENTS,
    nutrients
});