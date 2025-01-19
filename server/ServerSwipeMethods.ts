import { Meteor } from 'meteor/meteor';
import { executeQuery } from './database';

/**
 * The name of the columns should match the one of the interface
 */

Meteor.methods({
  // Define a method to handle the 'swipe left' action
  async server_swipeLeft(): Promise<any> {
    // Execute a SQL query to fetch a maximum of 10 randomly picked available books
    const books = await executeQuery('SELECT Books.id, Books.title, Authors.name AS author_id, Books.max_booking_time, Books.availability FROM Books JOIN Authors ON Books.author_id = Authors.id WHERE Books.availability > 0 ORDER BY RANDOM() LIMIT 10;');
    return books; // Return the fetched books
  },

  
  // Define a method to handle the 'swipe right' action
  async server_swipeRight(id: number): Promise<any> {
    // Execute a SQL query to fetch book details by book ID
    const books = await executeQuery('SELECT Books.id, Books.title, Authors.name AS author_id, Books.max_booking_time, Books.availability FROM Books JOIN Authors ON Books.author_id = Authors.id WHERE Books.id = ?;', [id]);
    return books; // Return the fetched books
  },
});
