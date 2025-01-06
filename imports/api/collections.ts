import Book from "../types/book";
import Genre from "../types/genre";

// Mock genre data
export const mockGenres: Genre[] = [
    { _id: '1', name: "Classic" },
    { _id: '2', name: "Historical Fiction" },
    { _id: '3', name: "Dystopian" },
    { _id: '4', name: "Fantasy" },
];

// Mock book data
export const mockBooks: Book[] = [
    {
        _id: '1',
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        description:
            "A novel set in the Jazz Age that explores themes of wealth, love, and the American Dream.",
        genre_id: '1',
        publishedDate: new Date("1925-04-10"),
    },
    {
        _id: '2',
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description:
            "A novel about the serious issues of rape and racial inequality narrated by a young girl in the South.",
        genre_id: '2',
        publishedDate: new Date("1960-07-11"),
    },
    {
        _id: '3',
        title: "1984",
        author: "George Orwell",
        description:
            "A dystopian novel that explores the dangers of totalitarianism and extreme political ideology.",
        genre_id: '3',
        publishedDate: new Date("1949-06-08"),
    },
    {
        _id: '4',
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        description:
            "The first book in the Harry Potter series, introducing the wizarding world and Harry's journey.",
        genre_id: '4',
        publishedDate: new Date("1997-06-26"),
    },
    {
        _id: '5',
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        description:
            "A fantasy novel about Bilbo Baggins's adventurous journey to reclaim a treasure guarded by a dragon.",
        genre_id: '4',
        publishedDate: new Date("1937-09-21"),
    },
];
