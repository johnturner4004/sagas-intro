import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; 
import logger from 'redux-logger';
// Bring in new middleware for sagas. WOOT!
import createSagaMiddleware from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import './index.css';

import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import rootReducer from'./redux/reducers/_reet.reducer'
import rootSaga from './redux/sagas/_root.saga'

// ----------------- Sagas ----------------------- //





// Saga Setup 1 - creat the saga middleware
const sagaMiddleware = createSagaMiddleware();


// ------------- Reducers -------------- //
const reduxStore = createStore(
  //imported root reducer
  rootReducer,
  //Saga Setup 4 - add it to the redux middlewaare
  applyMiddleware(logger, sagaMiddleware)
);

//Saga Setup 3 - make the watcherSaga run
sagaMiddleware.run( rootSaga );

ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
