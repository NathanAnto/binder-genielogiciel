import React, { useEffect, useState } from "react";
import { getBooks } from "../api/BookMethods";
import Book from "../types/book";


const Books: React.FC = () => {
    // TODO: Fetch books from the server and display them here
    // const books: Book[] = useTracker(() => getBooks());
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
            <h1>Kitaplar</h1>
            <p>Mevcut kitapların listesi</p>

            <ul>
                {books.length === 0 && <li>Kitap bulunamadı</li>}
                {books.map((book: Book) => (
                    <li key={book.id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Books;