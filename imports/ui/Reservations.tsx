import React, { useEffect, useState } from 'react';
import { Booking } from '../types/booking';
import { User } from '../types/user';
import { getUserByEmail } from '../api/UserMethods';
import { Meteor } from 'meteor/meteor';
import { getBookings, returnBooking } from '../api/BookingMethods';
import { getBooks } from '../api/BookMethods';
import Book from '../types/book';

export default function Reservations() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const email: string | undefined = Meteor.user()?.emails?.[0]?.address;

        if(email) {
            getUserByEmail(email).then((user: User) => {
                if (user) {
                    setUser(user);
                    getBookings(user.id!).then((bookings: Booking[]) => {
                        console.log(`${user.name} Bookings: ${JSON.stringify(bookings)}`);
                        setBookings(bookings);
                        getBooks().then((books: Book[]) => {
                            setBooks(books);
                        });
                    });
                } else {
                    console.log("User not found");
                }
            });
        } else {
            console.log(`No email: ${email} found`);
        }
    }, []);

    return (
        <div>
            <h1>Reservations</h1>
            {bookings.map((booking: Booking) => (
                <div key={booking.id}>
                    <h2>{books.find((b: Book) => b.id === booking.book_id)?.title}</h2>
                    <button onClick={() => {
                        returnBooking(booking.id!);
                        setBookings(bookings.filter((b: Booking) => b.id !== booking.id));
                    }}>Return</button>
                </div>
            ))}
        </div>
    )
}