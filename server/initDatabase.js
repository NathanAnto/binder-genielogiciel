import fs from 'fs';
import sqlite3 from 'sqlite3';

const DB_FILE = './booking_app.db';         // Path to database file
const SCHEMA_FILE = './server/schema.sql';  // Path to schema file
const DATA_FILE = './server/data.sql';      // Path to data file

/**
 * Initialize the database. If the database file already exists, skip initialization.
 * If the database file does not exist, create it using the schema file and feed it data.
 */
const initDatabase = () => {
    let db;

    if (fs.existsSync(DB_FILE)) {
        console.log('Database already exists. Skipping initialization.');
        console.log('To update the database, delete it and run server/initDatabase.js');
        return;
    } else {
        // Read the schema file
        const schema = fs.readFileSync(SCHEMA_FILE, 'utf-8');
        // Create a new database file
        db = new sqlite3.Database(DB_FILE);

        db.serialize(() => {
            console.log('Creating database...');
            // Execute the schema SQL to set up the database
            db.exec(schema, (err) => {
                if (err) {
                    console.error('Error creating database:', err);
                } else {
                    console.log('Database initialized successfully.');
                }
            });
        });
    }

    // Read the data file
    const data = fs.readFileSync(DATA_FILE, 'utf-8');

    db.serialize(() => {
        console.log('Feeding database...');
        // Execute the data SQL to populate the database
        db.exec(data, (err) => {
            if (err) {
                console.error('Error feeding database:', err);
            } else {
                console.log('Database fed successfully.');
            }
        });
    });

    // Close the database connection
    db.close();
};

// Run the initDatabase function to initialize the database
initDatabase();
