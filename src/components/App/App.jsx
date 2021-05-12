import BookList from '../BookList/BookList';
import BookForm from '../BookForm/BookForm';

import './App.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function App() {

  const dispatch = useDispatch();

  //TODO - delete me
  const fetchBookList = () => {
    
  }

  // GET Book List from server as we load
  useEffect(()=> {
    // TODO - REPLEACT THIS FUNCTION a DISPATCHING ACTION
    dispatch({type:`FETCH_BOOKS`});
  }, [])
  

  return (
    <div className="App">
      <header><h1>Books w/ Redux!</h1></header>
      <main>
        <BookForm fetchBookList={fetchBookList} />
        <BookList />
      </main>
    </div>
  );
}

export default App;