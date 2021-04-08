import { fruitConsts } from '../consts';

export const setFruit = (fruit) => ({
    type: fruitConsts.SET_FRUIT,
    fruit
});