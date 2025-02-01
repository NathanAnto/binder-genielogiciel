import { Meteor } from 'meteor/meteor';
import Book from '../types/book';

/**
 * Handles the 'swipe left' action by fetching a list of books.
 * @returns {Promise<Book[]>} A promise that resolves to the list of books.
 */
export async function swipeLeft(): Promise<Book[]> {
  // Call the Meteor method 'server_swipeLeft' asynchronously and fetch the books
  const books = await Meteor.callAsync('server_swipeLeft');
  return books;
}

/**
 * Handles the 'swipe right' action by fetching a book by its ID.
 * @param {number} book_id - The ID of the book to fetch.
 * @returns {Promise<Book>} A promise that resolves to the book with the specified ID.
 */
export async function swipeRight(book_id: number): Promise<Book> {
  // Call the Meteor method 'server_swipeRight' asynchronously with the book ID
  const books = await Meteor.callAsync('server_swipeRight', book_id);
  return books[0];
}