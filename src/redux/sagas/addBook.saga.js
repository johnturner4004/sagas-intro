import {put} from 'redux-saga/effects';
import axios from 'axios';

function* addBook( action ) {
  try {
    yield axios.post('/books', action.payload);
    yield put ({type: 'FETCH_BOOKS'});
  } catch (error) {
    alert(`Sorry. Things aren't working at the moment. Try again later `);
    console.log(`Error getting books`, error);
  }
}

export default addBook;