import sqlite3 from 'sqlite3';

// Open the booking_app.db database
const db = new sqlite3.Database('./booking_app.db');

/**
 * Execute a SQL query with optional parameters.
 * @param {string} query - The SQL query to execute.
 * @param {Array} parms - Optional parameters for the query.
 * @returns {Promise<Array>} - A promise that resolves with the query results as an array of rows.
 */
export const executeQuery = (query, parms = []) => {
    return new Promise((resolve, reject) => {
        // Run the query with the given parameters
        db.all(query, URLSearchParams, (err, rows) => {
            // Handle errors or return the rows
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};
