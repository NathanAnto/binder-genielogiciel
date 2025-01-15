INSERT INTO Users (name, email, password, is_admin) VALUES 
('Alice', 'alice@example.com', 'password123', 0),
('Bob', 'bob@example.com', 'securepass456', 1),
('Charlie', 'charlie@example.com', 'qwerty789', 0),
('Diana', 'diana@example.com', 'pass1234', 0),
('Eve', 'eve@example.com', '1234password', 0);

INSERT INTO Authors (name) VALUES 
('J.K. Rowling'),
('George R.R. Martin'),
('J.R.R. Tolkien'),
('Agatha Christie'),
('Stephen King');

INSERT INTO Books (title, author_id, max_booking_time, availability) VALUES 
('Harry Potter and the Sorcerer''s Stone', 1, 14, 1),
('A Game of Thrones', 2, 14, 0),
('The Hobbit', 3, 21, 1),
('Murder on the Orient Express', 4, 7, 1),
('The Shining', 5, 10, 1);

INSERT INTO Booking (user_id, book_id, booking_date) VALUES 
(1, 1, '2025-01-10'),
(2, 2, '2025-01-12'),
(3, 3, '2025-01-13'),
(4, 4, '2025-01-14'),
(5, 5, '2025-01-15');

INSERT INTO Genres (name) VALUES 
('Fantasy'),
('Science Fiction'),
('Mystery'),
('Horror'),
('Romance');

INSERT INTO Preferences (user_id, genre_id) VALUES 
(1, 1),
(2, 3),
(3, 2),
(4, 4),
(5, 5);