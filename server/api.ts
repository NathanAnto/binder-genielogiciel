import { Meteor } from 'meteor/meteor';
import { executeQuery } from './database';

// Define Meteor methods
Meteor.methods({
    async server_getBooks(): Promise<any> {
        return await executeQuery('SELECT * FROM Books');
    },
    async server_getBookById(id: string): Promise<any> {
        return await executeQuery('SELECT * FROM Books WHERE id = ?', [id]);
    },
    async querySQL(query) {
        return await executeQuery(query);
    }

    async server_addBook(book: any): Promise<void> {
        const { title, author_id, max_booking_time, availability } = book;
        await executeQuery('INSERT INTO Books (title, author_id, max_booking_time, availability) VALUES (?, ?, ?, ?)', [title, author_id, max_booking_time, availability]);
    },

    async server_deleteBook(id: string): Promise<void> {
        await executeQuery('DELETE FROM Books WHERE id = ?', [id]);
    }
    
});