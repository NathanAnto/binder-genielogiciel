import { Meteor } from 'meteor/meteor';
import { executeQuery } from './database';
import Book from '/imports/types/book';

// Define Meteor methods
Meteor.methods({
    /**
     * Fetches all books from the database.
     * @returns {Promise<any>} A promise that resolves to the list of all books.
     */
    async server_getBooks(): Promise<any> {
        return await executeQuery('SELECT * FROM Books');
    },

    /**
     * Fetches a book by its ID from the database.
     * @param {string} id - The ID of the book to fetch.
     * @returns {Promise<any>} A promise that resolves to the book with the specified ID.
     */
    async server_getBookById(id: string): Promise<any> {
        return await executeQuery('SELECT * FROM Books WHERE id = ?', [id]);
    },

    /**
     * Creates a new booking for a user.
     * @param {string} user_id - The ID of the user making the booking.
     * @param {Book} book - The book being booked.
     * @returns {Promise<any>} A promise that resolves when the booking is created.
     */
    async server_newBooking(user_id: string, book: Book): Promise<any> {
        return await executeQuery('INSERT INTO Bookings (user_id, book_id, booking_date) VALUES (?, ?, CURRENT_DATE)', [user_id, book.id]);
    },

    /**
     * Fetches all bookings for a user.
     * @param {string} user_id - The ID of the user whose bookings to fetch.
     * @returns {Promise<any>} A promise that resolves to the list of bookings for the specified user.
     */
    async server_getBookings(user_id: string): Promise<any> {
        return await executeQuery('SELECT * FROM Bookings WHERE user_id = ?', [user_id]);
    },

    /**
     * Deletes a booking by its ID.
     * @param {string} booking_id - The ID of the booking to delete.
     * @returns {Promise<any>} A promise that resolves when the booking is deleted.
     */
    async server_returnBooking(booking_id: string): Promise<any> {
        return await executeQuery('DELETE FROM Bookings WHERE id = ?', [booking_id]);
    },

    /**
     * Extends a booking by updating its booking date to the current date.
     * @param {string} booking_id - The ID of the booking to extend.
     * @returns {Promise<any>} A promise that resolves when the booking is extended.
     */
    async server_extendBooking(booking_id: string): Promise<any> {
        return await executeQuery('UPDATE Bookings SET booking_date = CURRENT_DATE WHERE id = ?', [booking_id]);
    },

    /**
     * Executes a custom SQL query.
     * @param {string} query - The SQL query to execute.
     * @returns {Promise<any>} A promise that resolves to the result of the query.
     */
    async querySQL(query) {
        return await executeQuery(query);
    }
});