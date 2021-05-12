import { combineReducers } from 'redux';
import bookList from './bookList.reducer'

const rootReducer = combineReducers({
  bookList
  //you would add more reducers here ...
});

export default rootReducer;