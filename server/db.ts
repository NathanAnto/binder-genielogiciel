import sqlite3 from 'sqlite3';
import Book from '/imports/types/book';
import Genre from '/imports/types/genre';
import { Books } from '/imports/api/BooksCollection';
import { Genres } from '/imports/api/GenresColleciton';

var db: sqlite3.Database;

// Open the SQLite database connection
const openDb = () => {
    return new sqlite3.Database('./binder.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to the SQLite database');
        }
    });
};

// Initialize the database tables
const initDb = async () => {
    db = await openDb();

    // Create the Genres table
    await db.run(`
        CREATE TABLE IF NOT EXISTS Genres (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);

    // Create the Books table with a foreign key to Genres
    await db.run(`
        CREATE TABLE IF NOT EXISTS Books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            publishedDate DATE,
            description TEXT,
            genre_id INTEGER,
            FOREIGN KEY(genre_id) REFERENCES Genres(id)
        )
    `);

    console.log('Database initialized and tables created!');
};

// Function to insert a genre
const insertGenre = (genre: Genre) => {
    Genres.insertAsync(genre);
    // db.run('INSERT INTO Genres (name) VALUES (?)', [genre.name]);
};

// Function to insert a book
const insertBook = (book: Book) => {
    Books.insertAsync(book);
    // const db = await openDb();
    // await db.run('INSERT INTO Books (title, author, publishedDate, description, genre_id) VALUES (?, ?, ?, ?, ?)', [book.title, book.author, book.publishedDate, book.description, book.genre_id]);
};

// Export the database functions
export { initDb, insertGenre, insertBook };
