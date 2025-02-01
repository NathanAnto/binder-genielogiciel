INSERT INTO Users (id, name, email, password, is_admin) VALUES 
(1, 'Nathan', 'nathan@test.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 0);

INSERT INTO Authors (id, name) VALUES 
(1, 'J.K. Rowling'),
(2, 'George R.R. Martin'),
(3, 'J.R.R. Tolkien'),
(4, 'Agatha Christie'),
(5, 'Stephen King');

INSERT INTO Books (id, title, author_id, genre_id, max_booking_time, availability) VALUES 
(1, 'Harry Potter and the Sorcerer''s Stone', 1, 1, 14, 1),
(2, 'A Game of Thrones', 2, 2, 14, 0),
(3, 'The Hobbit', 3, 3, 21, 1),
(4, 'Murder on the Orient Express', 4, 4, 7, 1),
(5, 'The Shining', 5, 5, 10, 1);

INSERT INTO Bookings (id, user_id, book_id, booking_date) VALUES 
(1, 1, 1, '2025-01-10'),
(2, 2, 2, '2025-01-12'),
(3, 3, 3, '2025-01-13'),
(4, 4, 4, '2025-01-14'),
(5, 5, 5, '2025-01-15');

INSERT INTO Genres (id, name) VALUES 
(1, 'Fantasy'),
(2, 'Science Fiction'),
(3, 'Mystery'),
(4, 'Horror'),
(5, 'Romance');

INSERT INTO Preferences (id, user_id, genre_id) VALUES 
(1, 1, 1),
(2, 1, 3);