import BookList from '../BookList/BookList';
import BookForm from '../BookForm/BookForm';

import './App.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function App() {

  const dispatch = useDispatch();

  const fetchBookList = () => {
    axios.get('/books')
      .then(response => {
        // Send to reducer
        dispatch({ type: 'SET_BOOK_LIST', payload: response.data });
      })
      .catch( error => {
        alert(`Sorry. Things aren't working at the moment. Try again later`);
        console.log('Error getting books', error);
      })
  }

  // GET Book List from server as we load
  useEffect(()=> {
    fetchBookList();
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