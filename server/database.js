import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./server/booking_app.db');
// For online use (master);
//const db = 'postgres://user:password@host:port/database_name';


export const executeQuery = (query, parms = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, URLSearchParams, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};