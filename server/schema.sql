-- Table to store user information
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  is_admin INTEGER DEFAULT 0 -- 0 for regular users, 1 for admin users
);

-- Table to store author information
CREATE TABLE authors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

-- Table to store book information
CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  max_booking_time INTEGER NOT NULL DEFAULT 30, -- Maximum booking time in days
  availability INTEGER DEFAULT 1, -- 1 for available, 0 for not available
  FOREIGN KEY(author_id) REFERENCES authors(id),
  FOREIGN KEY(genre_id) REFERENCES genres(id)
);

-- Table to store booking information
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  book_id INTEGER NOT NULL,
  booking_date DATE DEFAULT CURRENT_DATE, -- Date of booking
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(book_id) REFERENCES books(id)
);

-- Table to store genre information
CREATE TABLE genres (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

-- Table to store user preferences for genres
CREATE TABLE preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(genre_id) REFERENCES genres(id),
  UNIQUE(user_id, genre_id) -- Ensure each user can have a preference for a genre only once
);