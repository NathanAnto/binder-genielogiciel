import { WebApp } from 'meteor/webapp';
import { Book } from '../db/models';

// Setup API endpoints
WebApp.connectHandlers.use('/api/books', async (req, res) => {
  try {
    if (req.method === 'GET') {
      const books = await Book.findAll();
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify(books));
    } else {
      res.writeHead(405); // Method Not Allowed
      res.end();
    }
  } catch (error) {
    console.error('API Error:', error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}); 