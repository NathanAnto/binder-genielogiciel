CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  is_admin INTEGER DEFAULT 0
);

CREATE TABLE Authors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE Books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  max_booking_time INTEGER NOT NULL DEFAULT 30,
  availability INTEGER DEFAULT 1,
  FOREIGN KEY(author_id) REFERENCES Authors(id)
);

CREATE TABLE Booking (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  book_id INTEGER NOT NULL,
  booking_date DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY(user_id) REFERENCES Users(id),
  FOREIGN KEY(book_id) REFERENCES Books(id)
);

Tamam simdi kitaplarin database ekledigimde kayit edilmesi gerekiyor bunu en basit sekilde yapar misin 

CREATE TABLE Genres (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);

CREATE TABLE Preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES Users(id),
  FOREIGN KEY(genre_id) REFERENCES Genres(id)
);