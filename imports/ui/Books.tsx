import React, { useEffect, useState } from "react";
import { getBooks } from "../api/BookMethods";
import Book from "../types/book";

/**
 * Books component to fetch and display a list of books.
 * @returns {JSX.Element} The Books component.
 */
export const Books = () => {
    const [books, setBooks] = useState<Book[]>([]);

    // Fetch books from the server on component mount
    useEffect(() => {
        console.log("loading books page...");
        getBooks()
           .then((books: Book[]) => setBooks(books))
           .catch((error: Error) => console.error("Error getting books:", error));
    }, []);

    return (
        <div>
            <h1>Books</h1>
            <p>List of available books</p>

            <ul>
                {books.length === 0 && <li>No books found</li>}
                {books.map((book: Book) => (
                    <li key={book.id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Books;