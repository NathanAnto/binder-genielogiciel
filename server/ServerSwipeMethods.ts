import { Meteor } from 'meteor/meteor';
import { executeQuery } from './database';

/**
 * The name of the columns should match the one of the interface
 */

Meteor.methods({
  /**
   * Handles the 'swipe left' action by fetching a maximum of 10 randomly picked available books.
   * @returns {Promise<any>} A promise that resolves to the list of randomly picked available books.
   */
  async server_swipeLeft(): Promise<any> {
    // Execute a SQL query to fetch a maximum of 10 randomly picked available books
    const books = await executeQuery('SELECT Books.id, Books.title, Authors.name AS author_id, Books.max_booking_time, Books.availability FROM Books JOIN Authors ON Books.author_id = Authors.id WHERE Books.availability > 0 ORDER BY RANDOM() LIMIT 10;');
    return books; // Return the fetched books
  },

  /**
   * Handles the 'swipe right' action by fetching book details by book ID.
   * @param {number} id - The ID of the book to fetch.
   * @returns {Promise<any>} A promise that resolves to the book details with the specified ID.
   */
  async server_swipeRight(id: number): Promise<any> {
    // Execute a SQL query to fetch book details by book ID
    const books = await executeQuery('SELECT Books.id, Books.title, Authors.name AS author_id, Books.max_booking_time, Books.availability FROM Books JOIN Authors ON Books.author_id = Authors.id WHERE Books.id = ?;', [id]);
    return books; // Return the fetched books
  },
});