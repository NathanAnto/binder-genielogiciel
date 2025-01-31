import { Meteor } from 'meteor/meteor';
import { executeQuery } from './database';
import Book from '/imports/types/book';

// Define Meteor methods
Meteor.methods({
    // Book methods
    async server_getBooks(): Promise<any> {
        return await executeQuery('SELECT * FROM Books');
    },
    async server_getBookById(id: number): Promise<any> {
        return await executeQuery('SELECT * FROM Books WHERE id = ?', [id]);
    },
    // Booking methods
    async server_newBooking(user_id: number, book: Book): Promise<any> {
        return await executeQuery('INSERT INTO Bookings (user_id, book_id, booking_date) VALUES (?, ?, CURRENT_DATE)', [user_id, book.id]);
    },
    async server_getBookings(user_id: number): Promise<any> {
        return await executeQuery('SELECT * FROM Bookings WHERE user_id = ?', [user_id]);
    },
    async server_returnBooking(booking_id: number): Promise<any> {
        return await executeQuery('DELETE FROM Bookings WHERE id = ?', [booking_id]);
    },
    async server_extendBooking(booking_id: number): Promise<any> {
        return await executeQuery('UPDATE Bookings SET booking_date = CURRENT_DATE WHERE id = ?', [booking_id]);
    },
    async querySQL(query) {
        return await executeQuery(query);
    }
});