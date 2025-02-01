import { Meteor } from 'meteor/meteor';
import { executeQuery } from './database';

/**
 * The name of the columns should match the one of the interface
 */

Meteor.methods({
  /**
   * Handles the 'swipe left' action by fetching a maximum of 10 randomly picked available books.
   * @param {number} id - The ID of the user.
   * @returns {Promise<any>} A promise that resolves to the list of randomly picked available books.
   */
  async server_swipeLeft(id: number): Promise<any> {
    // Execute a SQL query to fetch a maximum of 10 randomly picked available books
    const sql = `
      SELECT Books.id, Books.title, Authors.name AS author_id, Books.max_booking_time, Books.availability 
      FROM Books 
      JOIN Authors ON Books.author_id = Authors.id 
      LEFT JOIN Preferences ON Books.genre_id = Preferences.genre_id 
      WHERE Books.availability > 0 
      AND (Preferences.user_id IS NOT NULL OR NOT EXISTS (SELECT 1 FROM Preferences WHERE user_id = ?)) 
      ORDER BY RANDOM() 
      LIMIT 10;
    `;
    const books = await executeQuery(sql, [id]);
    return books; // Return the fetched books
  },

  /**
   * Handles the 'swipe right' action by fetching book details by book ID.
   * @param {number} id - The ID of the book to fetch.
   * @returns {Promise<any>} A promise that resolves to the book details with the specified ID.
   */
  async server_swipeRight(id: number): Promise<any> {
    // Execute a SQL query to fetch book details by book ID
    const sql = `
      SELECT Books.id, Books.title, Authors.name AS author_id, Books.max_booking_time, Books.availability 
      FROM Books 
      JOIN Authors ON Books.author_id = Authors.id 
      WHERE Books.id = ?;
    `;
    const books = await executeQuery(sql, [id]);
    return books; // Return the fetched books
  },
});
