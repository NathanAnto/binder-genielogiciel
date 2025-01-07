import { Meteor } from 'meteor/meteor';
import { initDb, insertBook, insertGenre } from './db';
import { mockBooks, mockGenres } from '/imports/api/collections';
import { Books } from '/imports/api/BooksCollection';
import { Genres } from '/imports/api/GenresColleciton';

// Import methods
import "../imports/api/GenreMethods"; 

// Import publications
import "../imports/api/BookPublications";
import "../imports/api/GenrePublication";

// Initialize the database when the server starts
Meteor.startup(async () => {
    // await initDb();

    if ((await Books.find().countAsync()) === 0) {
        mockBooks.forEach(insertBook);
    }

    if ((await Genres.find().countAsync()) === 0) {
        mockGenres.forEach(insertGenre);
    }
});
