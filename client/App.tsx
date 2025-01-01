import React from 'react';
import { BookList } from './components/BookList';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Binder - Book Reservation System</h1>
      <BookList />
    </div>
  );
};

export default App;