import React from 'react';
import Book from '../types/book';
import { getBooks } from '../api/BookMethods';
import { useState, useEffect } from 'react';

export const Admin = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getBooks()
            .then((books: Book[]) => setBooks(books))
            .catch((error: Error) => console.error("Error getting books:", error));
    }, []);

    return (
        <div>
            <h1>Admin Panel</h1>
            <div>
                <h2>Book List</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>ID</th>
                            <th style={tableHeaderStyle}>Title</th>
                            <th style={tableHeaderStyle}>Max Booking Time</th>
                            <th style={tableHeaderStyle}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td style={tableCellStyle}>{book.id}</td>
                                <td style={tableCellStyle}>{book.title}</td>
                                <td style={tableCellStyle}>{book.max_booking_time} days</td>
                                <td style={tableCellStyle}>
                                    {book.availability ? 'Available' : 'Borrowed'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left' as const
};

const tableCellStyle = {
    padding: '8px',
    borderBottom: '1px solid #ddd'
};

export default Admin; 