import React, { useState, useEffect } from 'react';
import Book from '../types/book';
import { getBooks, addBook, deleteBook } from '../api/BookMethods';
import {
    AdminContainer,
    AdminHeader,
    AdminContent,
    AdminForm,
    BookTable,
    StatisticsDashboard
} from './styles/AdminStyles';

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
        <div>
            <AdminHeader>
                <div className="header-left">
                    <i className="fas fa-book"></i>
                    <span>Binder Admin</span>
                </div>
                <div className="header-right">
                    <div className="admin-user">
                        <i className="fas fa-user-circle"></i>
                        <span>Admin User</span>
                    </div>
                </div>
            </AdminHeader>

            <AdminContent>
                <div className="main-section">
                    <AdminForm onSubmit={handleSubmit}>
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
                    </AdminForm>

                    <BookTable>
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
                    </BookTable>
                </div>

                <StatisticsDashboard>
                    <select className="time-filter">
                        <option>Last 7 days</option>
                    </select>

                    <div className="stats-grid">
                        <div className="stats-card">
                            <h3>Top 10 Most Booked Books</h3>
                            <div className="chart-container">
                                {/* Chart.js eklenecek */}
                            </div>
                        </div>

                        <div className="stats-card">
                            <h3>User Engagement</h3>
                            <div className="chart-container">
                                {/* Doughnut chart eklenecek */}
                            </div>
                        </div>

                        <div className="stats-card">
                            <h3>Cancellation Statistics</h3>
                            <div className="stats-info">
                                <div className="stat-item">
                                    <span>Total Cancellations</span>
                                    <span className="value">45</span>
                                </div>
                                <div className="stat-item">
                                    <span>Cancellation Rate</span>
                                    <span className="value">8.5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </StatisticsDashboard>
            </AdminContent>
        </div>
    );
};

export default Admin;