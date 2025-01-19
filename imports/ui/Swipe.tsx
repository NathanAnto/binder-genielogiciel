import { getBooks } from "../api/BookMethods";
import React, { useState, useEffect } from "react"
import Book from "../types/book";
import { newBooking } from "../api/BookingMethods";
import { useCurrentUser } from "../api/useCurrentUser";

export default function Swipe() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getBooks().then((books) => {
            setBooks(books);
        });
    }, [])

    const { user, loading, error } = useCurrentUser();
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>Not logged in</div>;

    function newBookingClick(book: Book) {
        newBooking(user?.id!, book);
    }

    return (<>
        <h1>Swipe</h1>
        <div>
            {books.map((book) => (
                <div key={book.id}>
                    <h2>{book.title}</h2>
                    <button onClick={() => newBookingClick(book)}>Book</button>
                </div>
            ))}
        </div>
    </>
    )
}