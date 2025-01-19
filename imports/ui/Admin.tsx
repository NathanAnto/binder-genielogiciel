import React, { useState, useEffect } from 'react';
import Book from '../types/book';
import { getBooks, addBook, deleteBook } from '../api/BookMethods';

export const Admin = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [newBook, setNewBook] = useState({ title: '', author_id: '', max_booking_time: 30, availability: 1 });

    useEffect(() => {
        getBooks()
            .then((books: Book[]) => setBooks(books))
            .catch((error: Error) => console.error("Error getting books:", error));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addBook(newBook);
        setNewBook({ title: '', author_id: '', max_booking_time: 30, availability: 1 });
        getBooks().then(setBooks);
    };

    const handleDelete = async (id: string) => {
        await deleteBook(id);
        setBooks(await getBooks()); // Kitap listesini güncelle
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    required
                />
                <input
                    type="text"
                    name="author_id"
                    value={newBook.author_id}
                    onChange={handleInputChange}
                    placeholder="Author ID"
                    required
                />
                <input
                    type="number"
                    name="max_booking_time"
                    value={newBook.max_booking_time}
                    onChange={handleInputChange}
                    placeholder="Max Booking Time"
                    required
                />
                <button type="submit">Add Book</button>
            </form>
            <div>
                <h2>Book List</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Max Booking Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.max_booking_time} days</td>
                                <td>{book.availability ? 'Available' : 'Borrowed'}</td>
                                <td>
                                    <button onClick={() => handleDelete(book.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;