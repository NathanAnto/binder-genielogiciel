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
});