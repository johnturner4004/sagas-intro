import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; 
import logger from 'redux-logger';
// Bring in new middleware for sagas. WOOT!
import createSagaMiddleware from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import './index.css';

import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

// ----------------- Sagas ----------------------- //

function* fetchBooks() {
  try {
    //yield make us wait until the async thing (azios)is done)
    //keep the response in a variable to access later
    const response = yield axios.get('/books');
    yield put( { type: 'SET_BOOK_LIST', payload: response.data } );
  } catch (error) {
    alert('Sorry. Things aren\'t working at the moment. Try again later');
    console.log('Error getting books', error);
    
  }
  // axios.get('/books')
  //     .then(response => {
  //       // Send to reducer
  //       dispatch({ type: 'SET_BOOK_LIST', payload: response.data });
  //     })
  //     .catch( error => {
  //       alert(`Sorry. Things aren't working at the moment. Try again later`);
  //       console.log('Error getting books', error);
  //     })
}

function* addBook( action ) {
  try {
    yield axios.post('/books', action.payload);
    yield put ({type: 'FETCH_BOOKS'});
  } catch (error) {
    alert(`Sorry. Things aren't working at the moment. Try again later `);
    console.log(`Error getting books`, error);
    
  }
  // axios.post('/books', {
  //   title: title, author: author
  // })
  //   .then( response => {
  //     console.log('added book successfully');
  //     // GET the books from the server again
  //     fetchBookList();
  //   })
  //   .catch( error => {
  //     alert(`Sorry. Things aren't working at the moment. Try again later`);
  //     console.log('Error adding book', error);
  //   })
}

// Saga Setup 1 - creat the saga middleware
const sagaMiddleware = createSagaMiddleware();

//Saga Setup 2 - make the watcher function - name is a tack
// * makes this a "generator function"
function* watcherSaga() {
  yield takeEvery('FETCH_BOOKS', fetchBooks);
  yield takeEvery('ADD_BOOK', addBook)
}



// ------------- Reducers -------------- //
const bookList = (state=[], action) => {
  // TODO - set book list with data from server
  if (action.type === 'SET_BOOK_LIST') {
    // The action payload is a new array from the server 
    // It has ALL the information in it - no need to spread 
    // & add to previous state
    return action.payload;
  }
  return state;
}

const reduxStore = createStore(
  combineReducers({
    bookList
  }),
  //Saga Setup 4 - add it to the redux middlewaare
  applyMiddleware(logger, sagaMiddleware)
);

//Saga Setup 3 - make the watcherSaga run
sagaMiddleware.run( watcherSaga);

ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
