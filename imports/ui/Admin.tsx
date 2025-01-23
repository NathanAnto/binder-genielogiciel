import React, { useState, useEffect } from 'react';
import Book from '../types/book';
import { getBooks, addBook, deleteBook } from '../api/BookMethods';
import Dashboard from './Dashboard';

const Admin: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [newBook, setNewBook] = useState({ 
        title: '', 
        author_id: 0, 
        max_booking_time: 30, 
        availability: 1 
    });

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
        try {
            await addBook(newBook);
            setNewBook({title: '', author_id: 0, max_booking_time: 30, availability: 1 });
            const updatedBooks = await getBooks();
            setBooks(updatedBooks);
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBook(id);
            const updatedBooks = await getBooks();
            setBooks(updatedBooks);
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <Dashboard />
            <form onSubmit={handleSubmit} className="admin-form">
                <h2>Add New Book</h2>
                <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    placeholder="Book Title"
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
                    placeholder="Maximum Booking Time (days)"
                    required
                />
                <button type="submit">Add Book</button>
            </form>

            <div className="book-list-container">
                <h2>Book List</h2>
                <table className="book-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Booking Time</th>
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
                                    <button 
                                        className="delete-button"
                                        onClick={() => handleDelete(book.id.toString())}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;