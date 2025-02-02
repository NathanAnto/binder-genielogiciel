import { Meteor } from 'meteor/meteor';
import { executeQuery } from './database';

// Define Meteor methods
Meteor.methods({
    /**
     * Fetches booking statistics for the specified number of days.
     * @param {string} [days='7'] - The number of days to filter bookings by.
     * @returns {Promise<Object>} A promise that resolves to the booking statistics.
     */
    async server_getBookingStats(days: string = '7'): Promise<any> {
        let dateFilter = '';
        if (days !== 'all') {
            dateFilter = `WHERE booking_date >= DATE('now', '-${days} days')`;
        }

        // Get top 10 most booked books with date filter
        const topBooksQuery = `
            SELECT b.title, COUNT(bk.book_id) AS booking_count
            FROM Books b
            LEFT JOIN Bookings bk ON b.id = bk.book_id
            ${dateFilter}
            GROUP BY b.id, b.title
            ORDER BY booking_count DESC
            LIMIT 10
        `;
        const topBooks = await executeQuery(topBooksQuery);

        // Get genre engagement with date filter
        const genreEngagementQuery = `
            SELECT g.name, COUNT(bk.id) as booking_count
            FROM Genres g
            LEFT JOIN Books b ON b.genre_id = g.id
            LEFT JOIN Bookings bk ON bk.book_id = b.id
            ${dateFilter}
            GROUP BY g.id, g.name
            ORDER BY booking_count DESC
        `;
        const genreEngagement = await executeQuery(genreEngagementQuery);

        // Calculate cancellation stats with date filter
        const cancellationStatsQuery = `
            SELECT 
                COUNT(*) as total_bookings,
                SUM(CASE WHEN booking_date < date('now') THEN 1 ELSE 0 END) as completed_bookings
            FROM Bookings
            ${dateFilter}
        `;
        const cancellationStats = await executeQuery(cancellationStatsQuery);

        return {
            topBooks,
            genreEngagement,
            cancellationStats: {
                totalBookings: cancellationStats[0].total_bookings,
                completedBookings: cancellationStats[0].completed_bookings,
                cancellationRate: ((cancellationStats[0].total_bookings - cancellationStats[0].completed_bookings) / 
                                 cancellationStats[0].total_bookings * 100).toFixed(1)
            }
        };
    },

    /**
     * Updates the availability status of a book.
     * @param {string} bookId - The ID of the book to update.
     * @param {boolean} availability - The new availability status of the book.
     * @returns {Promise<boolean>} A promise that resolves to true if the update was successful.
     */
    async server_updateBookAvailability(bookId: string, availability: boolean): Promise<boolean> {
        const sql = `
            UPDATE Books 
            SET availability = ? 
            WHERE id = ?
        `;
        await executeQuery(sql, [availability ? 1 : 0, bookId]);
        return true;
    }
});
