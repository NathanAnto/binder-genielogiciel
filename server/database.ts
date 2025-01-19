import path from 'path';
import sqlite3 from 'sqlite3';
sqlite3.verbose();

// Update the database path to a writable location
// Linux;   "start": "PROJECT_ROOT=$(pwd) meteor run",
// Windows; "start": "set PROJECT_ROOT=%cd% && meteor run",
const projectRoot = String(process.env.PROJECT_ROOT?.trim());
const dbPath = path.resolve(projectRoot, 'data', 'booking_app.db');
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
        console.error('Full error object:', err);
        console.error('Attempted database path:', dbPath);
    } else {
        console.log('Connected to the booking_app database:');
        console.log(dbPath);
    }
});




/**
 * Execute a SQL query with optional parameters.
 * @param {string} query - The SQL query to execute.
 * @param {Array} params - Optional parameters for the query.
 * @returns {Promise<Array>} - A promise that resolves with the query results as an array of rows.
 */
export const executeQuery = (query: string, params?: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                console.error('SQL query error:', err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};
