import { nutrientConsts } from '../consts';

export default (state = [], action) => {
    switch(action.type) {
        case nutrientConsts.SET_NUTRIENTS:
            return action.nutrients;
        default:
            return state;
    }
}