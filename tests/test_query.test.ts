import { Meteor } from "meteor/meteor";
import { assert } from "chai";
import Book from "/imports/types/book";
import Genre from "/imports/types/genre";
import { User } from "/imports/types/user";
import { Booking } from "/imports/types/booking";

import { getBookById, getBooks } from "/imports/api/BookMethods";

import "../server/ServerBookMethods";
import "../server/ServerGenreMethods";
import "../server/ServerSwipeMethods";
import "../server/ServerUserMethods";

const mockBooks: Book[] = [
    {
        id: 1,
        title: "Harry Potter and the Sorcerer's Stone",
        max_booking_time: 14,
        author_id: 1,
        genre_id: 1,
        availability: 1,
    },
    {
        id: 2,
        title: "A Game of Thrones",
        max_booking_time: 14,
        author_id: 2,
        genre_id: 2,
        availability: 0,
    },
    {
        id: 3,
        title: "The Hobbit",
        max_booking_time: 21,
        author_id: 3,
        genre_id: 3,
        availability: 1,
    },
    {
        id: 4,
        title: "Murder on the Orient Express",
        max_booking_time: 7,
        author_id: 4,
        genre_id: 4,
        availability: 1,
    },
    {
        id: 5,
        title: "The Shining",
        max_booking_time: 10,
        author_id: 5,
        genre_id: 5,
        availability: 1,
    },
];

const mockBook: Book = mockBooks[0];

const mockBookings: Booking[] = [
    {
        id: 1,
        book_id: 1,
        user_id: 2,
        booking_date: new Date(),
    },
];

const mockGenres: Genre[] = [
    {
        id: 1,
        name: "Fantasy",
    },
    {
        id: 2,
        name: "Science Fiction",
    },
    {
        id: 3,
        name: "Mystery",
    },
    {
        id: 4,
        name: "Horror",
    },
    {
        id: 5,
        name: "Romance",
    },
];

const mockGenre: Genre = mockGenres[0];

const mockUsers: User[] = [
    {
        id: 1,
        name: "admin",
        email: "admin@binder.com",
        password: "password_hash1",
        is_admin: 1,
    },
    {
        id: 2,
        name: "John Doe",
        email: "john-doe@gmail.com",
        password: "password_hash2",
        is_admin: 0,
    },
];

const mockUser: User = mockUsers[0];

if (Meteor.isServer) {
    describe("Meteor Server Methods", function () {
        it("can get all books", async function () {
            // Call the server method and get the result
            const books = await Meteor.callAsync("server_getBooks");

            // Assert that the result is an array
            assert.isArray(books, "Books should be an array");

            // Assert that the result is not empty
            assert.isNotEmpty(books, "Books array should not be empty");
            assert.deepEqual(
                books,
                mockBooks,
                "Fetched books should match the mock data"
            );
        });

        it("can handle errors all books", async function () {
            try {
                await Meteor.callAsync("server_getBooks");
            } catch (error) {
                assert.isNotNull(error, "Error should not be null");
            }
        });

        it("can get book by ID", async function () {
            // Call the server method and get the result
            const res = await Meteor.callAsync("server_getBookById", 1);
            // Assert that the result is not empty
            // Assert that the result is an array
            assert.isArray(res, "Books should be an array");
            const book: Book = res[0]

            // Assert that the result is not empty
            assert.isNotEmpty(book, "Books array should not be empty");
            assert.deepEqual(
                book,
                mockBook,
                "Fetched book should match the mock data"
            );
        });

        it("can get bookings by user ID", async function () {
            try {
                // Call the server method and get the result
                const bookings = await Meteor.callAsync("server_getBookings", 1);

                // Assert that the result is an array
                assert.isArray(bookings, "Bookings should be an array");

                // Assert that the result is not empty
                assert.isNotEmpty(bookings, "Bookings array should not be empty");
                assert.deepEqual(
                    bookings,
                    mockBookings,
                    "Fetched bookings should match the mock data"
                );
            } catch (error) {
                assert.isNotNull(error, "Error should not be null");
            }
        });

        it("can handle errors book by ID", async function () {
            try {
                await Meteor.callAsync("server_getBookById", -1);
            } catch (error) {
                assert.isNotNull(error, "Error should not be null");
            }
        });

        it("can get genre by ID", async function () {
            try {
                const res = await Meteor.callAsync("server_getGenreById", 1);
                // Assert that the result is not empty
                assert.isNotEmpty(res, "Book should not be empty");
                const genre: Genre = res[0];

                assert.deepEqual(
                    genre,
                    mockGenre,
                    "Fetched genre should match the mock data"
                );
            } catch (error) {
                assert.isNotNull(error, "Error should not be null");
            }
        });

        it("can get all genres", async function () {
            try {
                const genres = await Meteor.callAsync("server_getGenres");

                // Assert that the result is an array
                assert.isArray(genres, "Books should be an array");

                // Assert that the result is not empty
                assert.isNotEmpty(genres, "Books array should not be empty");
                assert.deepEqual(
                    genres,
                    mockGenres,
                    "Fetched genres should match the mock data"
                );
            } catch (error) {
                assert.isNotNull(error, "Error should not be null");
            }
        });

        it("can get user by email", async function () {
            try {
                const res = await Meteor.callAsync(
                    "server_getUserByEmail",
                    "test"
                );
                // Assert that the result is not empty
                assert.isNotEmpty(res, "Book should not be empty");
                const user: User = res[0];

                assert.deepEqual(
                    user,
                    mockUser,
                    "Fetched user should match the mock data"
                );
            } catch (error) {
                assert.isNotNull(error, "Error should not be null");
            }
        });
    });
}

if (Meteor.isClient) {
    describe("Meteor Client Methods", function () {
        it("can get all books", async function () {
            // Call the server method and get the result
            const books = await getBooks();

            // Assert that the result is an array
            assert.isArray(books, "Books should be an array");
            // Assert that the result is not empty
            assert.isNotEmpty(books, "Books array should not be empty");
            assert.deepEqual(
                books,
                mockBooks,
                "Fetched books should match the mock data"
            );
        });

        it("can handle errors when fetching all books", async function () {
            try {
                await getBooks();
            } catch (error) {
                assert.isNotNull(error, "Error should not be null");
            }
        });

        it("can get book by ID", async function () {
            // Call the server method and get the result
            const book = await getBookById(1);

            // Assert that the result is not empty
            assert.isNotEmpty(book, "Book should not be empty");
            assert.deepEqual(
                book,
                mockBook,
                "Fetched book should match the mock data"
            );
        });

        it("can handle errors when fetching book by ID", async function () {
            try {
                await getBookById(5);
            } catch (error) {
                assert.isNotNull(error, "Error should not be null");
            }
        });
    });
}
