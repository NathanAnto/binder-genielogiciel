import { WebApp } from 'meteor/webapp';
import { Book } from './db/models';

// Setup API endpoints
WebApp.connectHandlers.use('/api/books', async (req, res) => {
  if (req.method === 'GET') {
    try {
      console.log('Books requested');
      const books = await Book.findAll({
        attributes: ['id', 'title', 'author', 'genre', 'description', 'isAvailable', 'rating', 'coverImage']
      });
      
      console.log('Number of books found:', books.length);
      
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify(books));
    } catch (error) {
      console.error('Error fetching books:', error);
      res.writeHead(500);
      res.end(JSON.stringify({error: error.message}));
    }
  }
});

// ... diğer API endpoint'leri 