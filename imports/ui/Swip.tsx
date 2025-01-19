import React, { useState, useEffect } from 'react';
import Hammer from 'hammerjs';
import { swipLeft, swipRight } from '/imports/api/SwipMethods';
import Book from '/imports/types/book';

const Swip = () => {
  // State to store the list of books
  const [books, setBooks] = useState<Book[]>([]);
  // State to store the selected book
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  // State to track if the swipe was to the left
  const [swipeLeftSide, setSwipeLeftSide] = useState(true);

  // Function to get a random book from a list
  const getRandomBook = (books: Book[]): Book | null => {
    if (books.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * books.length);
    return books[randomIndex];
  };

  // Effect to handle swipe events
  useEffect(() => {
    // Select the swipe container element
    const element = document.querySelector('.swipe-container');
    if (element) {
      // Initialize Hammer.js on the element
      const hammer = new Hammer(element);

      // Function to handle swipe left events
      const handleSwipeLeft = async () => {
        try {
          if (books.length === 0) {
            // Fetch books if the list is empty
            const fetchedBooks = await swipLeft();
            const randomBook = getRandomBook(fetchedBooks);
            setBooks(fetchedBooks);
            setSelectedBook(randomBook);
            setSwipeLeftSide(true);
          } else {
            // Get a random book from the existing list
            const randomBook = getRandomBook(books);
            setSelectedBook(randomBook);
            setBooks((prevBooks) => prevBooks.filter(book => book.id !== randomBook?.id));
            setSwipeLeftSide(true);
          }
        } catch (error) {
          console.error(error);
        }
      };

      // Function to handle swipe right events
      const handleSwipeRight = async () => {
        try {
          if (selectedBook) {
            // Fetch book details for the selected book
            const fetchedBook = await swipRight(selectedBook.id);
            setSelectedBook(fetchedBook);
            setSwipeLeftSide(false);
          }
        } catch (error) {
          console.error(error);
        }
      };

      // Add swipe event listeners
      hammer.on('swipeleft', handleSwipeLeft);
      hammer.on('swiperight', handleSwipeRight);
      
      return () => {
        // Cleanup swipe event listeners
        hammer.off('swipeleft', handleSwipeLeft);
        hammer.off('swiperight', handleSwipeRight);
      };
    }
  }, [books, selectedBook]);

  // Initial effect to fetch books on component mount
  useEffect(() => {
    const handleSwipeLeft = async () => {
      try {
        const fetchedBooks = await swipLeft();
        const randomBook = getRandomBook(fetchedBooks);
        setBooks(fetchedBooks);
        setSelectedBook(randomBook);
        setSwipeLeftSide(true);
      } catch (error) {
        console.error(error);
      }
    };
    // Call the function to fetch books
    handleSwipeLeft();
  }, []);
  
  return (
    <div className="swipe-container">
      <div className="swipe-area">
        {selectedBook ? (
          swipeLeftSide ? (
            <div>
              <h2>{selectedBook.title}</h2>
              <p>Author: {selectedBook.author_id}</p>
            </div>
          ) : (
            <div>
              <h2>{selectedBook.title}</h2>
              <p>Author: {selectedBook.author_id}</p>
              <p>Max Booking Time: {selectedBook.max_booking_time} days</p>
            </div>
          )
        ) : (
          <div>
            <p>No book selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Swip;
