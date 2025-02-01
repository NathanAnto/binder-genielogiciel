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