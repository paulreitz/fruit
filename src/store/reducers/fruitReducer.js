import { fruitConsts } from '../consts';

export default (state = [], action) => {
    switch(action.type) {
        case fruitConsts.SET_FRUIT:
            return action.fruit;
        default:
            return state;
    }
}