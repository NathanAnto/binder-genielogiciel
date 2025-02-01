import { Meteor } from "meteor/meteor";
import Book from "../types/book";

/**
 * Fetches all books from the server.
 * @returns {Promise<Book[]>} A promise that resolves to the list of all books.
 */
export async function getBooks(): Promise<Book[]> {
    const books: Book[] = await Meteor.callAsync('server_getBooks');
    return books;
}

/**
 * Fetches a book by its ID from the server.
 * @param {string} id - The ID of the book to fetch.
 * @returns {Promise<Book>} A promise that resolves to the book with the specified ID.
 */
export async function getBookById(id: number): Promise<Book> {
    const books: Book[] = await Meteor.callAsync('server_getBookById', id);
    return books[0];
}

// Add a new book to the library
export async function addBook(book: Book): Promise<void> {
    try {
        await Meteor.callAsync('server_addBook', {
            title: book.title,
            author_id: book.author_id,
            genre_id: book.genre_id,
            max_booking_time: book.max_booking_time,
            availability: book.availability
        });
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
}

// Delete a book from the library
export async function deleteBook(bookId: string): Promise<void> {
    try {
        await Meteor.callAsync('server_deleteBook', bookId);
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}

// Update book availability
export async function updateBookAvailability(bookId: string, availability: boolean): Promise<void> {
    try {
        await Meteor.callAsync('server_updateBookAvailability', bookId, availability);
    } catch (error) {
        console.error('Error updating book availability:', error);
        throw error;
    }
}
