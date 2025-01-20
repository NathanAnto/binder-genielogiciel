import React, { useState, useEffect } from 'react';
import Book from '../types/book';
import { getBooks, addBook, deleteBook } from '../api/BookMethods';
import './Admin.css';
import Dashboard from './Dashboard'; // Dashboard'u import edin

function Admin() {
    const [books, setBooks] = useState<Book[]>([]);
    const [newBook, setNewBook] = useState({ 
        title: '', 
        author_id: '', 
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
            setNewBook({ title: '', author_id: '', max_booking_time: 30, availability: 1 });
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
            <h1>Admin Panel</h1>
            <Dashboard /> {/* Dashboard'u render edin */}
            <form onSubmit={handleSubmit} className="admin-form">
                <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    placeholder="Kitap Başlığı"
                    required
                />
                <input
                    type="text"
                    name="author_id"
                    value={newBook.author_id}
                    onChange={handleInputChange}
                    placeholder="Yazar ID"
                    required
                />
                <input
                    type="number"
                    name="max_booking_time"
                    value={newBook.max_booking_time}
                    onChange={handleInputChange}
                    placeholder="Maksimum Kiralama Süresi"
                    required
                />
                <button type="submit">Kitap Ekle</button>
            </form>

            <div className="book-list-container">
                <h2>Kitap Listesi</h2>
                <table className="book-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Başlık</th>
                            <th>Kiralama Süresi</th>
                            <th>Durum</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.max_booking_time} gün</td>
                                <td>{book.availability ? 'Müsait' : 'Kiralandı'}</td>
                                <td>
                                    <button 
                                        className="delete-button"
                                        onClick={() => handleDelete(book.id)}
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;