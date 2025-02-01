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
        const sql = 'SELECT * FROM Books';
        return await executeQuery(sql);
    },

    /**
     * Fetches a book by its ID from the database.
     * @param {string} id - The ID of the book to fetch.
     * @returns {Promise<any>} A promise that resolves to the book with the specified ID.
     */
    async server_getBookById(id: string): Promise<any> {
        const sql = 'SELECT * FROM Books WHERE id = ?';
        return await executeQuery(sql, [id]);
    },

    /**
     * Creates a new booking for a user.
     * @param {string} user_id - The ID of the user making the booking.
     * @param {Book} book - The book being booked.
     * @returns {Promise<any>} A promise that resolves when the booking is created.
     */
    async server_newBooking(user_id: string, book: Book): Promise<any> {
        const sql = 'INSERT INTO Bookings (user_id, book_id, booking_date) VALUES (?, ?, CURRENT_DATE)';
        return await executeQuery(sql, [user_id, book.id]);
    },

    /**
     * Fetches all bookings for a user.
     * @param {string} user_id - The ID of the user whose bookings to fetch.
     * @returns {Promise<any>} A promise that resolves to the list of bookings for the specified user.
     */
    async server_getBookings(user_id: string): Promise<any> {
        const sql = 'SELECT * FROM Bookings WHERE user_id = ?';
        return await executeQuery(sql, [user_id]);
    },

    /**
     * Deletes a booking by its ID.
     * @param {string} booking_id - The ID of the booking to delete.
     * @returns {Promise<any>} A promise that resolves when the booking is deleted.
     */
    async server_returnBooking(booking_id: string): Promise<any> {
        const sql = 'DELETE FROM Bookings WHERE id = ?';
        return await executeQuery(sql, [booking_id]);
    },

    /**
     * Extends a booking by updating its booking date to the current date.
     * @param {string} booking_id - The ID of the booking to extend.
     * @returns {Promise<any>} A promise that resolves when the booking is extended.
     */
    async server_extendBooking(booking_id: string): Promise<any> {
        const sql = 'UPDATE Bookings SET booking_date = CURRENT_DATE WHERE id = ?';
        return await executeQuery(sql, [booking_id]);
    },

    /**
     * Adds a new book to the database.
     * @param {Book} book - The book object containing book details.
     * @returns {Promise<void>} A promise that resolves when the book is added.
     */
    async server_addBook(book: Book): Promise<void> {
        const sql = `
            INSERT INTO Books (title, author_id, genre_id, max_booking_time, availability) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const params = [
            book.title,
            book.author_id,
            book.genre_id,
            book.max_booking_time,
            book.availability
        ];
        
        await executeQuery(sql, params);
    },

    /**
     * Deletes a book by its ID.
     * @param {string} bookId - The ID of the book to delete.
     * @returns {Promise<boolean>} A promise that resolves when the book is deleted.
     */
    async server_deleteBook(bookId: string): Promise<boolean> {
        // First, delete bookings related to this book
        let sql = 'DELETE FROM Bookings WHERE book_id = ?'
        await executeQuery(sql, [bookId]);
        // Then, delete the book
        sql = 'DELETE FROM Books WHERE id = ?';
        await executeQuery(sql, [bookId]);
        return true;
    },

    /**
     * Searches for books based on a search term and filter.
     * @param {string} searchTerm - The term to search for.
     * @param {string} searchFilter - The filter to apply (title, author, genre).
     * @returns {Promise<any>} A promise that resolves to the list of books matching the search criteria.
     */
    async server_searchBooks(searchTerm: string, searchFilter: string): Promise<any> {
        let sql = `
            SELECT 
                b.id,
                b.title,
                b.max_booking_time,
                b.availability,
                a.name as author_name,
                g.name as genre_name
            FROM Books b
            LEFT JOIN Authors a ON b.author_id = a.id
            LEFT JOIN Genres g ON b.genre_id = g.id
            WHERE 1=1
        `;

        if (searchTerm) {
            switch (searchFilter) {
                case 'title':
                    sql += ` AND b.title LIKE '%${searchTerm}%'`;
                    break;
                case 'author':
                    sql += ` AND a.name LIKE '%${searchTerm}%'`;
                    break;
                case 'genre':
                    sql += ` AND g.name LIKE '%${searchTerm}%'`;
                    break;
            }
        }

        sql += ' ORDER BY b.title';
        
        return await executeQuery(sql);
    },

    /**
     * Fetches all authors from the database.
     * @returns {Promise<any>} A promise that resolves to the list of all authors.
     */
    async server_getAuthors(): Promise<any> {
        const sql = 'SELECT id, name FROM Authors ORDER BY name';
        return await executeQuery(sql);
    }
});
