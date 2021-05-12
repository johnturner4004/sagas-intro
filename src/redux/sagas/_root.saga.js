import {takeEvery} from 'redux-saga/effects'

import addBook from './addBook.saga';
import fetchBooks from './fetchBooks.saga'

//Saga Setup 2 - make the watcher function - name is a tack
// * makes this a "generator function"
function* watcherSaga() {
  yield takeEvery('FETCH_BOOKS', fetchBooks);
  yield takeEvery('ADD_BOOK', addBook)
}

export default watcherSaga;