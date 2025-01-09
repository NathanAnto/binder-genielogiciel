import React, { useState } from "react";
import Book from "../types/book";
import { Meteor } from "meteor/meteor";





export default function Books() {
    // TODO: Fetch books from the server and display them here
    // const books: Book[] = useTracker(() => getBooks());
    const [books, setBooks] = useState<Book[]>([]);
    
    // Fetch books from the server
    if(books.length === 0) {
        Meteor.call('getBooks', function (_req: any, res: any) {
            if (res.error) {
                console.error("Error getting books:", res.error);
            } else {
                console.log("Books retrieved successfully:", res);
                const books: Book[] = res;
                setBooks(books);
            }
        });
    }

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
            {/* {books.map((book: Book) => (
                <div key={book._id}>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                </div>
            ))} */}
        </div>
    );
};
