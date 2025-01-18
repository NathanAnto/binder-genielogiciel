import { getBooks } from "../api/BookMethods";
import React, { useState, useEffect } from "react"
import Book from "../types/book";
import { Meteor } from "meteor/meteor";
import { newBooking } from "../api/BookingMethods";
import { getUserByEmail } from "../api/UserMethods";
import { User } from "../types/user";

export default function Swipe() {
    const [books, setBooks] = useState<Book[]>([]);

    function newBookingClick(book: Book) {
        const email: string | undefined = Meteor.user()?.emails?.[0]?.address;
        if(email) {
            getUserByEmail(email).then((user: User) => {
                if (user) {
                    console.log(`Found user ${user.name} with email: ${email}, creating booking...`);
                    newBooking(user.id!, book);
                } else {
                    console.log("User not found");
                }
            });
        } else {
            console.log(`No email: ${email} found`);
        }
    }

    useEffect(() => {
        getBooks().then((books) => {
            setBooks(books);
        });
    }, [])

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