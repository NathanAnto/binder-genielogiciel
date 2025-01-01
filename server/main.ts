import { Meteor } from 'meteor/meteor';
const { sequelize, testConnection } = require('./db/config.js');
import { Book } from './db/models';
import { get_real_books } from '../data/generate_mock_data';
import './api/books';

Meteor.startup(async () => {
  console.log('Server starting...');
  
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }

    await sequelize.sync({ force: true });
    console.log('Database tables created');

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
