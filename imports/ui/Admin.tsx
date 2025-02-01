import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import Book from '../types/book';
import { getBooks, addBook, deleteBook, updateBookAvailability } from '../api/BookMethods';
import {
    AdminContainer,
    AdminHeader,
    AdminContent,
    AdminForm,
    BookTable,
    StatisticsDashboard,
    AvailabilityToggle
} from './styles/AdminStyles';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

interface Author {
    id: number;
    name: string;
}

interface Genre {
    id: number;
    name: string;
}

// Main admin panel component for managing books and viewing statistics
const Admin: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [newBook, setNewBook] = useState({ 
        title: '', 
        author_id: 0,
        genre_id: 1,  // Default to Fantasy (1)
        max_booking_time: 30, 
        availability: 1 
    });
    const [timeFilter, setTimeFilter] = useState('7'); // Default to 7 days
    const [stats, setStats] = useState({
        topBooks: [],
        genreEngagement: [],
        cancellationStats: {
            totalBookings: 0,
            completedBookings: 0,
            cancellationRate: '0'
        }
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchFilter, setSearchFilter] = useState('title');
    const [authors, setAuthors] = useState<Author[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

    useEffect(() => {
        // Fetch books, authors and genres
        Promise.all([
            getBooks(),
            Meteor.callAsync('server_getAuthors'),
            Meteor.callAsync('server_getGenres')
        ]).then(([booksData, authorsData, genresData]) => {
            setBooks(booksData);
            setAuthors(authorsData);
            setGenres(genresData);
        }).catch(error => {
            console.error("Error fetching data:", error);
        });

        Meteor.callAsync('server_getBookingStats', timeFilter)
            .then(stats => setStats(stats))
            .catch(error => console.error("Error getting stats:", error));
    }, [timeFilter]);

    // Fetch books with search parameters
    const searchBooks = async () => {
        try {
            const result = await Meteor.callAsync('server_searchBooks', searchTerm, searchFilter);
            setFilteredBooks(result);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    useEffect(() => {
        searchBooks();
    }, [searchTerm, searchFilter]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
        const { value } = e.target;
        // Convert string values to numbers for numeric fields
        const numericFields = ['author_id', 'genre_id', 'max_booking_time'];
        const newValue = numericFields.includes(field) ? parseInt(value) : value;
        
        setNewBook(prev => ({ 
            ...prev, 
            [field]: newValue 
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Submitting book:', newBook); // For debugging
            
            // Validate required fields
            if (!newBook.title || !newBook.author_id || !newBook.genre_id) {
                alert('Please fill all required fields');
                return;
            }

            await addBook(newBook);
            // Reset form after successful submission
            setNewBook({
                title: '', 
                author_id: 0, 
                genre_id: 1, 
                max_booking_time: 30, 
                availability: 1
            });
            // Refresh book list
            const updatedBooks = await getBooks();
            setBooks(updatedBooks);
        } catch (error) {
            console.error("Error adding book:", error);
            alert('Error adding book. Please try again.');
        }
    };

    const handleDeleteBook = async (bookId: string) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await deleteBook(bookId);
                // Refresh book list after deletion
                const result = await Meteor.callAsync('server_searchBooks', searchTerm, searchFilter);
                setFilteredBooks(result);
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    const handleTimeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeFilter(e.target.value);
    };

    const handleAvailabilityToggle = async (bookId: string, currentAvailability: boolean) => {
        try {
            await updateBookAvailability(bookId, !currentAvailability);
            // Kitap listesini yenile
            const result = await Meteor.callAsync('server_searchBooks', searchTerm, searchFilter);
            setFilteredBooks(result);
        } catch (error) {
            console.error('Error updating availability:', error);
        }
    };

    // Chart data for Top Books
    const topBooksChartData = {
        labels: stats.topBooks.map((book: any) => book.title),
        datasets: [{
            label: 'Number of Bookings',
            data: stats.topBooks.map((book: any) => book.booking_count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // Chart data for Genre Engagement
    const genreChartData = {
        labels: stats.genreEngagement.map((genre: any) => genre.name),
        datasets: [{
            data: stats.genreEngagement.map((genre: any) => genre.booking_count),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(199, 199, 199, 0.6)',
                'rgba(83, 102, 255, 0.6)',
                'rgba(40, 159, 64, 0.6)',
                'rgba(210, 199, 199, 0.6)',
            ]
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            }
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
                    {/* Compact Add Book Form */}
                    <AddBookSection>
                        <h3>Add New Book</h3>
                        <CompactForm onSubmit={handleSubmit}>
                            <div className="form-row">
                                <input
                                    type="text"
                                    placeholder="Book Title"
                                    value={newBook.title}
                                    onChange={(e) => handleInputChange(e, 'title')}
                                    required
                                />
                                <select
                                    value={newBook.author_id}
                                    onChange={(e) => handleInputChange(e, 'author_id')}
                                    required
                                >
                                    <option value="">Select Author</option>
                                    {authors.map(author => (
                                        <option key={author.id} value={author.id}>{author.name}</option>
                                    ))}
                                </select>
                                <select
                                    value={newBook.genre_id}
                                    onChange={(e) => handleInputChange(e, 'genre_id')}
                                    required
                                >
                                    <option value="">Select Genre</option>
                                    {genres.map(genre => (
                                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-row">
                                <input
                                    type="number"
                                    placeholder="Max Booking Time (days)"
                                    value={newBook.max_booking_time}
                                    onChange={(e) => handleInputChange(e, 'max_booking_time')}
                                    required
                                    min="1"
                                />
                                <button type="submit" className="add-button">Add Book</button>
                            </div>
                        </CompactForm>
                    </AddBookSection>

                    {/* Search Section */}
                    <SearchSection>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search books..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select
                                value={searchFilter}
                                onChange={(e) => setSearchFilter(e.target.value)}
                            >
                                <option value="title">By Title</option>
                                <option value="author">By Author</option>
                                <option value="genre">By Genre</option>
                            </select>
                            <button className="search-button" onClick={searchBooks}>
                                <i className="fas fa-search"></i> Search
                            </button>
                        </div>
                    </SearchSection>

                    <BookTable>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Max Booking Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((book: Book) => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author_name}</td>
                                    <td>{book.genre_name}</td>
                                    <td>{book.max_booking_time} days</td>
                                    <td>
                                        <AvailabilityToggle 
                                            type="checkbox"
                                            checked={book.availability === 1}
                                            onChange={() => handleAvailabilityToggle(book.id, book.availability === 1)}
                                        />
                                    </td>
                                    <td>
                                        <DeleteButton onClick={() => handleDeleteBook(book.id)}>
                                            Delete
                                        </DeleteButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </BookTable>
                </div>

                <StatisticsDashboard>
                    <select 
                        className="time-filter" 
                        value={timeFilter}
                        onChange={handleTimeFilterChange}
                    >
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 3 months</option>
                        <option value="180">Last 6 months</option>
                        <option value="365">Last year</option>
                        <option value="all">All time</option>
                    </select>

                    <div className="stats-grid">
                        <div className="stats-card">
                            <h3>Top 10 Most Booked Books</h3>
                            <div className="chart-container" style={{ height: '300px' }}>
                                <Bar data={topBooksChartData} options={chartOptions} />
                            </div>
                        </div>

                        <div className="stats-card">
                            <h3>Genre Engagement</h3>
                            <div className="chart-container" style={{ height: '300px' }}>
                                <Doughnut data={genreChartData} options={chartOptions} />
                            </div>
                        </div>

                        <div className="stats-card">
                            <h3>Cancellation Statistics</h3>
                            <div className="stats-info">
                                <div className="stat-item">
                                    <span>Total Bookings</span>
                                    <span className="value">{stats.cancellationStats.totalBookings}</span>
                                </div>
                                <div className="stat-item">
                                    <span>Cancellation Rate</span>
                                    <span className="value">{stats.cancellationStats.cancellationRate}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </StatisticsDashboard>
            </AdminContent>
        </div>
    );
};

// Styled toggle switch component
const AvailabilityToggle = styled.input`
    position: relative;
    width: 50px;
    height: 24px;
    appearance: none;
    background-color: #ddd;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:checked {
        background-color: #4CAF50;
    }

    &::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: white;
        top: 2px;
        left: 2px;
        transition: transform 0.3s;
    }

    &:checked::before {
        transform: translateX(26px);
    }
`;

// Add new styled components
const AddBookSection = styled.div`
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;

    h3 {
        margin: 0 0 15px 0;
        color: #2c3e50;
    }
`;

const CompactForm = styled.form`
    .form-row {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;

        input, select {
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;

            &:focus {
                outline: none;
                border-color: #4a90e2;
            }
        }

        .add-button {
            padding: 8px 20px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;

            &:hover {
                background: #45a049;
            }
        }
    }
`;

const SearchSection = styled.div`
    margin-bottom: 20px;

    .search-container {
        display: flex;
        gap: 10px;
        align-items: center;
        background: white;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);

        input {
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;

            &:focus {
                outline: none;
                border-color: #4a90e2;
            }
        }

        select {
            width: 120px;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: white;
            font-size: 14px;
        }

        .search-button {
            padding: 8px 16px;
            background: #4a90e2;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;

            &:hover {
                background: #357abd;
            }

            i {
                font-size: 14px;
            }
        }
    }
`;

// Styled components for buttons
const DeleteButton = styled.button`
    padding: 6px 12px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #c82333;
    }
`;

export default Admin;