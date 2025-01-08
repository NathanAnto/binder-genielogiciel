import React from "react";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import Book from "/imports/types/book";
import { BooksCollection } from "/imports/api/BooksCollection";
import { GenresCollection } from "/imports/api/GenresColleciton";

const BookList: React.FC = () => {
    const isLoading = useSubscribe("books");
    const books: Book[] = useTracker(() => BooksCollection.find({}).fetch());

    if (isLoading()) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Books</h1>
            <ul>
                {books.map((book) => {
                    const genre = GenresCollection.findOne({ _id: book.genre_id }); // Use findOne to get a single genre
                    return (
                        <li key={book._id}>
                            <h2>{book.title}</h2>
                            <p>{book.author}</p>
                            <p>Genre: {genre?.name}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default BookList;
