import { Meteor } from 'meteor/meteor';
import { executeQuery } from './database';

// Define Meteor methods
Meteor.methods({
    async server_getBooks(): Promise<any> {
        const books = await executeQuery('SELECT * FROM Books');
        return books;
    },
    async server_getBookById(id: string): Promise<any> {
        const book = await executeQuery('SELECT * FROM Books WHERE id = ?', [id]);
        return book;
    },
    async querySQL(query) {
        return await executeQuery(query);
    },

    async server_addBook(book: any): Promise<void> {
        console.log('Adding book:', book); // Debug için

        const sql = `
            INSERT INTO Books (title, author_id, genre_id, max_booking_time, availability) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const params = [
            book.title,
            book.author_id,
            book.genre_id,  // genre_id'yi ekledik
            book.max_booking_time,
            book.availability
        ];

        console.log('SQL params:', params); // Debug için
        
        try {
            await executeQuery(sql, params);
        } catch (error) {
            console.error('Error in server_addBook:', error);
            throw new Meteor.Error('database-error', error.message);
        }
    },

    async server_deleteBook(bookId: string) {
        try {
            // Önce bu kitapla ilgili bookingleri silelim
            await executeQuery('DELETE FROM Bookings WHERE book_id = ?', [bookId]);
            // Sonra kitabı silelim
            await executeQuery('DELETE FROM Books WHERE id = ?', [bookId]);
            return true;
        } catch (error) {
            console.error('Database error:', error);
            throw new Meteor.Error('database-error', error.message);
        }
    },

    async server_checkUserCredentials(email: string, password: string) {
        try {
            // First check for hardcoded admin credentials
            if (email === 'admin' && password === 'admin') {
                return { isValid: true, isAdmin: true };
            }

            // Then check database users
            const sql = `
                SELECT is_admin 
                FROM Users 
                WHERE email = ? AND password = ?
            `;
            
            const user = await executeQuery(sql, [email, password]);
            
            if (user && user.length > 0) {
                return { 
                    isValid: true, 
                    isAdmin: user[0].is_admin === 1 
                };
            }

            return { isValid: false, isAdmin: false };
        } catch (error) {
            console.error('Database error:', error);
            throw new Meteor.Error('database-error', error.message);
        }
    },

    async server_getBookingStats(days: string = '7') {
        try {
            let dateFilter = '';
            if (days !== 'all') {
                dateFilter = `WHERE booking_date >= date('now', '-${days} days')`;
            }

            // Get top 10 most booked books with date filter
            const topBooksQuery = `
                SELECT b.title, COUNT(bk.book_id) as booking_count
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
        } catch (error) {
            console.error('Error getting booking stats:', error);
            throw new Meteor.Error('database-error', error.message);
        }
    },

    async server_updateBookAvailability(bookId: string, availability: boolean) {
        try {
            const sql = `
                UPDATE Books 
                SET availability = ? 
                WHERE id = ?
            `;
            await executeQuery(sql, [availability ? 1 : 0, bookId]);
            return true;
        } catch (error) {
            console.error('Database error:', error);
            throw new Meteor.Error('database-error', error.message);
        }
    },

    async server_getAuthors() {
        try {
            const sql = 'SELECT id, name FROM Authors ORDER BY name';
            return await executeQuery(sql);
        } catch (error) {
            console.error('Database error:', error);
            throw new Meteor.Error('database-error', error.message);
        }
    },

    async server_getGenres() {
        try {
            const sql = 'SELECT id, name FROM Genres ORDER BY name';
            return await executeQuery(sql);
        } catch (error) {
            console.error('Database error:', error);
            throw new Meteor.Error('database-error', error.message);
        }
    },

    async server_searchBooks(searchTerm: string, searchFilter: string) {
        try {
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
            
            const results = await executeQuery(sql);
            return results;
        } catch (error) {
            console.error('Database error:', error);
            throw new Meteor.Error('database-error', error.message);
        }
    }
});