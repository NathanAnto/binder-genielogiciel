import fs from 'fs';
import sqlite3 from 'sqlite3';

const DB_FILE = './booking_app.db';         // Path to database file
const SCHEMA_FILE = './server/schema.sql';  // Path to schema file
const DATA_FILE = './server/data.sql';      // Path to data file

const initDatabase = () => {
    let db;

    if (fs.existsSync(DB_FILE)) {
        console.log('Database already exists. Skipping initialization.');
        console.log('To update the database delete it and run server/initDatabase.js');
        return
    } else {
        const schema = fs.readFileSync(SCHEMA_FILE, 'utf-8');
        db = new sqlite3.Database(DB_FILE);

        db.serialize(() => {
            console.log('Creating database...');
            db.exec(schema, (err) => {
                if (err) {
                    console.error('Error creating database:', err);
                } else {
                    console.log('Database initialized successfully.');
                }
            });
        });
    }

    const data = fs.readFileSync(DATA_FILE, 'utf-8');

    db.serialize(() => {
        console.log('Feeding database...');
        db.exec(data, (err) => {
            if (err) {
                console.error('Error feeding database:', err);
            } else {
                console.log('Database feeded successfully.');
            }
        });
    });

    db.close();
};

initDatabase();
