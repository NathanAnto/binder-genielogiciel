import React, { useEffect, useState } from "react";
import { getBooks } from "../api/BookMethods";
import Book from "../types/book";

// Component to display all books in the library
const Books: React.FC = () => {
    // TODO: Fetch books from the server and display them here
    // const books: Book[] = useTracker(() => getBooks());
    const [books, setBooks] = useState<Book[]>([]);

    // Fetch books when component mounts
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