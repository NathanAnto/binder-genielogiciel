-- Insert data into Users table
INSERT INTO Users (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com'),
('Charlie', 'charlie@example.com');

-- Insert data into Author table
INSERT INTO Author (name) VALUES
('J.K. Rowling'),
('George R.R. Martin'),
('J.R.R. Tolkien');

-- Insert data into Books table
INSERT INTO Books (title, author_id, availability) VALUES
('Harry Potter and the Philosopher´s Stone', 1, 1),
('A Game of Thrones', 2, 1),
('The Hobbit', 3, 1);

-- Insert data into Booking table
INSERT INTO Booking (user_id, book_id, booking_date) VALUES
(1, 1, '2024-12-25'),
(2, 2, '2024-12-26'),
(3, 3, '2024-12-27');
