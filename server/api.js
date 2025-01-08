import { Meteor } from 'meteor/meteor';
import { executeQuery } from './database.js';
import { WebApp } from 'meteor/webapp';
import bodyParser from 'body-parser';

// Define Meteor methods
Meteor.methods({
    async getBooks() {
        return await executeQuery('SELECT * FROM Books');
    },
    async bookItem(userId, bookId) {
        return await executeQuery('INSERT INTO Bookings (user_id, book_id) VALUES (?, ?)', [userId, bookId]);
    },
    async querySQL(query) {
        return await executeQuery(query);
    }
});

// Use bodyParser middleware to parse JSON requests
WebApp.connectHandlers.use(bodyParser.json());

// Expose getBooks method as a REST endpoint
WebApp.connectHandlers.use('/api/books', async (req, res) => {
    if (req.method === 'GET') {
        try {
            const books = await Meteor.call('getBooks');
            console.log(books);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(books));
        } catch (err) {
            console.error("Error getting books:", err); // Log the error
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }
});
