-- Clear existing data
DELETE FROM Preferences;
DELETE FROM Bookings;
DELETE FROM Books;
DELETE FROM Authors;
DELETE FROM Genres;
DELETE FROM Users;

-- Insert Users
INSERT INTO Users (name, email, password, is_admin) VALUES 
('Alice', 'alice@example.com', 'password123', 0),
('Bob', 'bob@example.com', 'securepass456', 1),
('Charlie', 'charlie@example.com', 'qwerty789', 0),
('Diana', 'diana@example.com', 'pass1234', 0),
('Eve', 'eve@example.com', '1234password', 0),
('Frank', 'frank@example.com', 'frank123', 0),
('Grace', 'grace@example.com', 'grace456', 1),
('Henry', 'henry@example.com', 'henry789', 0),
('Ivy', 'ivy@example.com', 'ivy123', 0),
('Jack', 'jack@example.com', 'jack456', 0);

-- Insert Authors
INSERT INTO Authors (name) VALUES 
('J.K. Rowling'),
('George R.R. Martin'),
('J.R.R. Tolkien'),
('Agatha Christie'),
('Stephen King'),
('Jane Austen'),
('Dan Brown'),
('Arthur Conan Doyle'),
('Isaac Asimov'),
('Neil Gaiman');

-- Insert Genres
INSERT INTO Genres (name) VALUES 
('Fantasy'),
('Science Fiction'),
('Mystery'),
('Horror'),
('Romance'),
('Thriller'),
('Historical Fiction'),
('Adventure'),
('Crime'),
('Drama');

-- Insert Books
INSERT INTO Books (title, author_id, genre_id, max_booking_time, availability) VALUES 
('Harry Potter and the Sorcerer''s Stone', 1, 1, 14, 1),
('A Game of Thrones', 2, 1, 14, 0),
('The Hobbit', 3, 1, 21, 1),
('Murder on the Orient Express', 4, 3, 7, 1),
('The Shining', 5, 4, 10, 1),
('Pride and Prejudice', 6, 5, 14, 1),
('The Da Vinci Code', 7, 6, 10, 0),
('Sherlock Holmes', 8, 9, 7, 1),
('Foundation', 9, 2, 14, 1),
('American Gods', 10, 1, 14, 1),
('Harry Potter and the Chamber of Secrets', 1, 1, 14, 1),
('A Clash of Kings', 2, 1, 14, 1),
('The Two Towers', 3, 1, 21, 0),
('Death on the Nile', 4, 3, 7, 1),
('IT', 5, 4, 10, 1);

-- Insert Bookings (including some historical data)
INSERT INTO Bookings (user_id, book_id, booking_date) VALUES 
-- Recent bookings
(1, 1, '2024-01-10'),
(2, 2, '2024-01-12'),
(3, 3, '2024-01-13'),
(4, 4, '2024-01-14'),
(5, 5, '2024-01-15'),
-- Historical bookings
(6, 1, '2023-12-01'),
(7, 1, '2023-12-05'),
(8, 1, '2023-12-10'),  -- Harry Potter booked multiple times
(9, 2, '2023-12-15'),
(10, 3, '2023-12-20'),
(1, 4, '2023-12-25'),
(2, 5, '2023-12-30'),
(3, 6, '2024-01-01'),
(4, 7, '2024-01-02'),
(5, 8, '2024-01-03'),
-- More recent bookings
(6, 9, '2024-01-05'),
(7, 10, '2024-01-07'),
(8, 11, '2024-01-08'),
(9, 12, '2024-01-09'),
(10, 13, '2024-01-11');

-- Insert more varied booking dates
INSERT INTO Bookings (user_id, book_id, booking_date) VALUES 
-- Last 7 days
(1, 1, date('now', '-2 days')),
(2, 2, date('now', '-3 days')),
(3, 3, date('now', '-4 days')),
(4, 4, date('now', '-5 days')),
(5, 5, date('now', '-6 days')),

-- Last 30 days
(6, 1, date('now', '-10 days')),
(7, 2, date('now', '-15 days')),
(8, 3, date('now', '-20 days')),
(9, 4, date('now', '-25 days')),
(1, 5, date('now', '-28 days')),

-- Last 3 months
(2, 6, date('now', '-35 days')),
(3, 7, date('now', '-45 days')),
(4, 8, date('now', '-60 days')),
(5, 9, date('now', '-75 days')),
(6, 10, date('now', '-85 days')),

-- Last 6 months
(7, 11, date('now', '-100 days')),
(8, 12, date('now', '-130 days')),
(9, 13, date('now', '-160 days')),
(10, 14, date('now', '-175 days')),
(1, 15, date('now', '-180 days')),

-- Last year
(2, 1, date('now', '-200 days')),
(3, 2, date('now', '-250 days')),
(4, 3, date('now', '-300 days')),
(5, 4, date('now', '-330 days')),
(6, 5, date('now', '-360 days')),

-- Popular books with multiple bookings
(7, 1, date('now', '-15 days')),  -- Harry Potter
(8, 1, date('now', '-45 days')),  -- Harry Potter
(9, 1, date('now', '-75 days')),  -- Harry Potter
(10, 1, date('now', '-150 days')), -- Harry Potter
(1, 2, date('now', '-30 days')),  -- Game of Thrones
(2, 2, date('now', '-90 days')),  -- Game of Thrones
(3, 2, date('now', '-180 days')), -- Game of Thrones

-- Genre diversity
(4, 6, date('now', '-10 days')),  -- Romance
(5, 7, date('now', '-20 days')),  -- Thriller
(6, 8, date('now', '-30 days')),  -- Crime
(7, 9, date('now', '-40 days')),  -- Sci-Fi
(8, 10, date('now', '-50 days')), -- Fantasy
(9, 11, date('now', '-60 days')), -- Fantasy
(10, 12, date('now', '-70 days')), -- Fantasy

-- Recent intensive activity
(1, 3, date('now', '-1 days')),
(2, 4, date('now', '-2 days')),
(3, 5, date('now', '-3 days')),
(4, 6, date('now', '-4 days')),
(5, 7, date('now', '-5 days')),
(6, 8, date('now', '-6 days')),
(7, 9, date('now', '-7 days')),

-- Historical data
(8, 10, date('now', '-400 days')),
(9, 11, date('now', '-450 days')),
(10, 12, date('now', '-500 days'));

-- Insert more user preferences to match the booking patterns
INSERT INTO Preferences (user_id, genre_id) VALUES 
-- Additional Fantasy preferences (matching Harry Potter popularity)
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
-- Mystery and Thriller preferences
(6, 3), (7, 3), (8, 6), (9, 6),
-- Sci-Fi preferences
(10, 2), (1, 2), (2, 2),
-- Horror preferences
(3, 4), (4, 4),
-- Romance preferences
(5, 5), (6, 5),
-- Crime preferences
(7, 9), (8, 9),
-- Historical Fiction
(9, 7), (10, 7);