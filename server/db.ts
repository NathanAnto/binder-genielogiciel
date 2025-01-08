import Book from '/imports/types/book';
import Genre from '/imports/types/genre';
import { BooksCollection } from '/imports/api/BooksCollection';
import { GenresCollection } from '/imports/api/GenresColleciton';

// Function to insert a genre
export function insertGenre(genre: Genre) {
    console.log('Adding new genre: ', genre.name);
    GenresCollection.insertAsync(genre);
};

export function removeGenre(id: string) {
    console.log('Removing genre with id: ', id);
    GenresCollection.removeAsync(id);
}

// Function to insert a book
export function insertBook(book: Book) {
    BooksCollection.insertAsync(book);
};