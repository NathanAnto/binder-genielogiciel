import { Meteor } from "meteor/meteor";
import Book from "../types/book";

// Function to get all books
export async function getBooks(): Promise<Book[]> {
    const books: Book[] = await Meteor.callAsync('server_getBooks');
    return books;
}

// Function to get a book by its ID
export async function getBookById(id: string): Promise<Book> {
    const books: Book[] = await Meteor.callAsync('server_getBookById', id);
    return books[0];
}