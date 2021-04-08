import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { serverCall } from './utils/server';
import store from './store/configureStore';
import { setNutrients } from './store/actions/nutrientActions';
import { setFruit } from './store/actions/fruitActions';

serverCall('nutrients', {}, 'get')
.then(result => {
  store.dispatch(setNutrients(result));
  return serverCall('fruit', {}, 'get');
})
.then(result => {
  store.dispatch(setFruit(result));
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
