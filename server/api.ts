import { Meteor } from 'meteor/meteor';
import { executeQuery } from './database';
import { WebApp } from 'meteor/webapp';
import Book from '/imports/types/book';
import bodyParser from 'body-parser';

// Define Meteor methods
Meteor.methods({
    async getBooks(): Promise<any> {
        return await executeQuery('SELECT * FROM Books');
    },
    async getBookById(id: string): Promise<any> {
        return await executeQuery('SELECT * FROM Books WHERE id = ?', [id]);
    },
    async bookItem(user_id: string, book_id: string): Promise<any> {
        return await executeQuery('INSERT INTO Bookings (user_id, book_id) VALUES (?, ?)', [user_id, book_id]);
    },
    async querySQL(query) {
        return await executeQuery(query);
    }
});

// Use bodyParser middleware to parse JSON requests
WebApp.connectHandlers.use(bodyParser.json());

WebApp.connectHandlers.use('/api/books/:id', async (req: any, res: any) => {
    const book_id = parseInt(req.params.id);

    if (req.method === 'GET') {
        try {
            const book: Book = await Meteor.call('getBookById', book_id);
            console.log(book);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(book));
        } catch (err: any) {
            console.error("Error getting book with id: ", book_id, err); // Log the error
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }
});

// Expose getBooks method as a REST endpoint
WebApp.connectHandlers.use('/api/books', async (req: any, res: any) => {
    if (req.method === 'GET') {
        try {
            const books: Book[] = await Meteor.call('getBooks');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(books));
        } catch (err: any) {
            console.error("Error getting books:", err); // Log the error
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }
});
