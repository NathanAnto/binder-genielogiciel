import React from "react";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import Book from "/imports/types/book";
import { Books } from "/imports/api/BooksCollection";

const BookList: React.FC = () => {
    const isLoading = useSubscribe("books");  
    const books: Book[] = useTracker(() => Books.find({}).fetch());

    if (isLoading()) {
      return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Books</h1>
            <ul>
                {books.map((book) => (
                    <li key={book._id}>
                        <h2>{book.title}</h2>
                        <span>{book.author}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
