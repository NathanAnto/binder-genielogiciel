import React, { useState } from 'react';
import { Booking } from '../types/booking';
import { extendBooking, getBookings, returnBooking } from '../api/BookingMethods';
import { getBooks } from '../api/BookMethods';
import Book from '../types/book';
import { useCurrentUser } from '../api/useCurrentUser';

export default function Bookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [books, setBooks] = useState<Book[]>([]);

    const { user, loading, error } = useCurrentUser();
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>Not logged in</div>;

    getBookings(user.id!).then((bookings: Booking[]) => {
        setBookings(bookings);
        getBooks().then((books: Book[]) => {
            setBooks(books);
        });
    });

    function addDays(date: Date, days: number): Date {
        let result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    }

    return (
        <div>
            <h1>Bookings</h1>
            {bookings.map((booking: Booking) => {
                const book: Book | undefined = books.find((b: Book) => b.id == booking.book_id);
                if (!book) return null;
                const dueDate: Date = addDays(new Date(booking.booking_date), book.max_booking_time)
                
                // Return booking if due date is in the past
                if (dueDate < new Date()) {
                    returnBooking(booking.id!);
                }

                return (
                <div key={booking.id}>
                    <h2>{book?.title}</h2>
                    <p>Book due: {dueDate.toDateString()} </p>

                    <button onClick={() => {
                        extendBooking(booking.id!);
                    }}>Extend</button>

                    <button onClick={() => {
                        returnBooking(booking.id!);
                        setBookings(bookings.filter((b: Booking) => b.id !== booking.id));
                    }}>Return</button>
                </div>
            )})}
        </div>
    )
}