import { Meteor } from 'meteor/meteor';
import { insertBook, insertGenre } from './db';
import { mockBooks, mockGenres } from '/imports/api/collections';
import { BooksCollection } from '/imports/api/BooksCollection';
import { GenresCollection } from '/imports/api/GenresColleciton';

// Import methods
import "../imports/api/GenreMethods"; 

// Import publications
import "../imports/api/BookPublications";
import "../imports/api/GenrePublication";

// Initialize the database when the server starts
Meteor.startup(async () => {
    if ((await BooksCollection.find().countAsync()) === 0) {
        mockBooks.forEach(insertBook);
    }

    if ((await GenresCollection.find().countAsync()) === 0) {
        mockGenres.forEach(insertGenre);
    }
});
