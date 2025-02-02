import { Meteor } from 'meteor/meteor';
import Book from '../types/book';

/**
 * Handles the 'swipe left' action by fetching a list of books.
 * @param {number} user_id - The ID of the user performing the swipe left action.
 * @returns {Promise<Book[]>} A promise that resolves to the list of books.
 */
export async function swipeLeft(user_id: number): Promise<Book[]> {
    let books: Book[];
    try {
        // Call the Meteor method 'server_swipeLeft' asynchronously and fetch the books
        books = await Meteor.callAsync('server_swipeLeft', user_id);
    } catch (error) {
        console.error('Error fetching books on swipe left:', error);
        throw error;
    }
    return books;
}

/**
 * Handles the 'swipe right' action by fetching a book by its ID.
 * @param {number} book_id - The ID of the book to fetch.
 * @returns {Promise<Book>} A promise that resolves to the book with the specified ID.
 */
export async function swipeRight(book_id: number): Promise<Book> {
    let books: Book[];
    try {
        // Call the Meteor method 'server_swipeRight' asynchronously with the book ID
        books = await Meteor.callAsync('server_swipeRight', book_id);
    } catch (error) {
        console.error('Error fetching book on swipe right:', error);
        throw error;
    }
    return books[0];
}
