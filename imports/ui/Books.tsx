import React, { useEffect, useState } from "react";
import { getBooks } from "../api/BookMethods";
import Book from "../types/book";

export const Books = () => {
    // TODO: Fetch books from the server and display them he
    const [books, setBooks] = useState<Book[]>([]);

    // On page load
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