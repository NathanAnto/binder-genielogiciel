import React from 'react';
import BookList from './components/BookList';
import GenreList from './components/GenreList';

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <BookList />
    <GenreList />
  </div>
);
