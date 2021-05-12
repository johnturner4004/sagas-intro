import {put} from 'redux-saga/effects';
import axios from 'axios';

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
}

export default fetchBooks;