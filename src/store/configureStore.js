import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import FruitReducer from './reducers/fruitReducer';
import NutrientReducer from './reducers/nutrientReducer';

const componseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        fruit: FruitReducer,
        nutrients: NutrientReducer
    }),
    componseEnhancers(applyMiddleware(thunk))
);

export default store;