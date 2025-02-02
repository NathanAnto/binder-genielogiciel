-- Insert Users
INSERT INTO Users (id, name, email, password, is_admin) VALUES 
(1, 'Nathan', 'nathan@test.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 0),
(2, 'Admin', 'admin@test.com', '60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752', 1);

-- Insert Authors
INSERT INTO Authors (id, name) VALUES
(1, 'J.K. Rowling'),
(2, 'George R.R. Martin'),
(3, 'J.R.R. Tolkien'),
(4, 'Agatha Christie'),
(5, 'Stephen King'),
(6, 'Jane Austen'),
(7, 'Dan Brown'),
(8, 'Arthur Conan Doyle'),
(9, 'Isaac Asimov'),
(10, 'Neil Gaiman');

-- Insert Books
INSERT INTO Books (id, title, author_id, genre_id, max_booking_time, availability) VALUES 
(1, 'Harry Potter and the Sorcerer''s Stone', 1, 1, 14, 1),
(2, 'A Game of Thrones', 2, 2, 14, 0),
(3, 'The Hobbit', 3, 3, 21, 1),
(4, 'Murder on the Orient Express', 4, 4, 7, 1),
(5, 'The Shining', 5, 5, 10, 1),
(6, 'Pride and Prejudice', 6, 5, 14, 1),
(7, 'The Da Vinci Code', 7, 6, 10, 0),
(8, 'Sherlock Holmes', 8, 9, 7, 1),
(9, 'Foundation', 9, 2, 14, 1),
(10, 'American Gods', 10, 1, 14, 1),
(11, 'Harry Potter and the Chamber of Secrets', 1, 1, 14, 1),
(12, 'A Clash of Kings', 2, 1, 14, 1),
(13, 'The Two Towers', 3, 1, 21, 0),
(14, 'Death on the Nile', 4, 3, 7, 1),
(15, 'IT', 5, 4, 10, 1);

-- Insert Bookings (including some historical data)
INSERT INTO Bookings (id, user_id, book_id, booking_date) VALUES
(1, 1, 1, '2024-01-10'),
(2, 1, 4, '2023-12-25');

-- Insert Genres
INSERT INTO Genres (id, name) VALUES 
(1, 'Fantasy'),
(2, 'Science Fiction'),
(3, 'Mystery'),
(4, 'Horror'),
(5, 'Romance'),
(6, 'Thriller'),
(7, 'Historical Fiction'),
(8, 'Adventure'),
(9, 'Crime'),
(10, 'Drama');

-- Insert more user preferences to match the booking patterns
INSERT INTO Preferences (id, user_id, genre_id) VALUES 
(1, 1, 1),
(2, 1, 2);