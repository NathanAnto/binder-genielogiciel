import { Meteor } from "meteor/meteor";
import Book from "../types/book";

/**
 * Fetches all books from the server.
 * @returns {Promise<Book[]>} A promise that resolves to the list of all books.
 */
export async function getBooks(): Promise<Book[]> {
    let books: Book[];
    try {
        books = await Meteor.callAsync('server_getBooks');
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
    return books;
}

/**
 * Fetches a book by its ID from the server.
 * @param {string} id - The ID of the book to fetch.
 * @returns {Promise<Book>} A promise that resolves to the book with the specified ID.
 */
export async function getBookById(id: string): Promise<Book> {
    let books: Book[];
    try {
        books = await Meteor.callAsync('server_getBookById', id);
    } catch (error) {
        console.error('Error fetching book by ID:', error);
        throw error;
    }
    return books[0];
}

/**
 * Adds a new book to the library.
 * @param {Book} book - The book to add.
 * @returns {Promise<void>} A promise that resolves when the book is added.
 */
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

/**
 * Deletes a book from the library.
 * @param {string} bookId - The ID of the book to delete.
 * @returns {Promise<void>} A promise that resolves when the book is deleted.
 */
export async function deleteBook(bookId: string): Promise<void> {
    try {
        await Meteor.callAsync('server_deleteBook', bookId);
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}

/**
 * Updates the availability of a book.
 * @param {string} bookId - The ID of the book to update.
 * @param {boolean} availability - The new availability status of the book.
 * @returns {Promise<void>} A promise that resolves when the book's availability is updated.
 */
export async function updateBookAvailability(bookId: string, availability: boolean): Promise<void> {
    try {
        await Meteor.callAsync('server_updateBookAvailability', bookId, availability);
    } catch (error) {
        console.error('Error updating book availability:', error);
        throw error;
    }
}
