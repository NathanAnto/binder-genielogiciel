import React, { useEffect, useState, useRef } from 'react';
import { Meteor } from 'meteor/meteor';

// Book interface definition
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  isAvailable: boolean;
  coverImage: string;
  rating: number;
}

export const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 4; // Number of books to display per page
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch books on component mount
  useEffect(() => {
    console.log('Loading books...');
    fetch('/api/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle book reservation
  const handleBooking = (bookId: number) => {
    Meteor.call('bookings.create', bookId, (error: any) => {
      if (error) {
        alert('Reservation failed: ' + error.message);
      } else {
        alert('Book successfully reserved!');
      }
    });
  };

  // Handle pagination scroll
  const handleScroll = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    } else if (direction === 'right' && (currentPage + 1) * booksPerPage < books.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Get books for current page
  const visibleBooks = books.slice(currentPage * booksPerPage, (currentPage + 1) * booksPerPage);

  return (
    <div>
      <h2>Book List</h2>
      {/* Main container with navigation arrows */}
      <div style={{ position: 'relative', margin: '0 40px' }}>
        {/* Left navigation arrow */}
        {currentPage > 0 && (
          <button
            onClick={() => handleScroll('left')}
            style={{
              position: 'absolute',
              left: -40,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              transition: 'background-color 0.3s'
            }}
          >
            ←
          </button>
        )}
        
        {/* Right navigation arrow */}
        {(currentPage + 1) * booksPerPage < books.length && (
          <button
            onClick={() => handleScroll('right')}
            style={{
              position: 'absolute',
              right: -40,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              transition: 'background-color 0.3s'
            }}
          >
            →
          </button>
        )}

        {/* Book grid container */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          padding: '1rem'
        }}>
          {/* Book cards */}
          {visibleBooks.map(book => (
            <div key={book.id} style={{ 
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '480px'
            }}>
              {/* Book cover image container */}
              <div style={{
                width: '100%',
                height: '320px',
                position: 'relative',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}>
                <img 
                  src={book.coverImage || 'https://via.placeholder.com/200x300?text=No+Cover'} 
                  alt={`Cover of ${book.title}`}
                  style={{
                    width: 'auto',
                    height: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    padding: '0.5rem'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/200x300?text=No+Cover';
                  }}
                />
              </div>
              {/* Book details container */}
              <div style={{ 
                padding: '1rem', 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: '#fff'
              }}>
                {/* Book title */}
                <h3 style={{ 
                  margin: '0 0 0.5rem 0',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#2c3e50'
                }}>{book.title}</h3>
                {/* Author name */}
                <p style={{ 
                  margin: '0 0 0.5rem 0',
                  color: '#666',
                  fontSize: '0.9rem'
                }}>Author: {book.author}</p>
                {/* Rating display */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0.5rem 0'
                }}>
                  <span style={{ color: '#f39c12' }}>
                    {'★'.repeat(Math.floor(book.rating))}
                    {'☆'.repeat(5 - Math.floor(book.rating))}
                  </span>
                  <span style={{ marginLeft: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                    {book.rating.toFixed(1)}
                  </span>
                </div>
                {/* Book description with ellipsis */}
                <p style={{ 
                  margin: '0.5rem 0',
                  fontSize: '0.9rem',
                  color: '#666',
                  flex: 1,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis'
                }}>
                  {book.description}
                </p>
                {/* Reserve button */}
                <button 
                  onClick={() => handleBooking(book.id)}
                  disabled={!book.isAvailable}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: book.isAvailable ? '#2ecc71' : '#95a5a6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: book.isAvailable ? 'pointer' : 'not-allowed',
                    transition: 'background-color 0.2s',
                    marginTop: 'auto'
                  }}
                >
                  {book.isAvailable ? 'Reserve' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};