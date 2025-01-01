import { Meteor } from 'meteor/meteor';
import db from './db/config';
import { Book } from './db/models';
import { get_real_books } from '../data/generate_mock_data';
import './api/books';

Meteor.startup(async () => {
  console.log('Server starting...');
  
  try {
    // Test database connection
    const isConnected = await db.testConnection();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }

    // Force sync to create tables
    await db.sequelize.sync({ force: true });
    console.log('Database tables created');

    // Load initial data
    const books = get_real_books();
    for (const book of books) {
      await Book.create({
        ...book,
        isAvailable: true,
        bookingDuration: 14
      });
    }
    console.log(`Loaded ${books.length} books`);

  } catch (error) {
    console.error('Startup error:', error);
    process.exit(1);
  }
});
