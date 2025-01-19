import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
// import { done } from 
import Book from '/imports/types/book';
import { getBookById, getBooks } from '/imports/api/BookMethods';
import '../server/api'

const mockBooks: Book[] = [
  {
      id: 1,
      title: "Harry Potter and the Sorcerer's Stone",
      max_booking_time: 14,
      author_id: 1,
      availability: 1,
  },
  {
      id: 2,
      title: "A Game of Thrones",
      max_booking_time: 14,
      author_id: 2,
      availability: 0,
  },
  {
      id: 3,
      title: "The Hobbit",
      max_booking_time: 21,
      author_id: 3,
      availability: 1,
  },
  {
      id: 4,
      title: "Murder on the Orient Express",
      max_booking_time: 7,
      author_id: 4,
      availability: 1,
  },
  {
      id: 5,
      title: "The Shining",
      max_booking_time: 10,
      author_id: 5,
      availability: 1,
  },
];

const mockBook: Book = mockBooks[0];

if (Meteor.isServer) {
  describe('Meteor Server Methods', function () {
    it('can get all books', async function () {
        // Call the server method and get the result
        const books = await Meteor.callAsync('server_getBooks');

        // Assert that the result is an array
        assert.isArray(books, 'Books should be an array');

        // Assert that the result is not empty
        assert.isNotEmpty(books, 'Books array should not be empty');
        assert.deepEqual(books, mockBooks, "Fetched books should match the mock data");
    });

    it("can handle errors all books", async function () {
        try {
            await Meteor.callAsync('server_getBooks');
        } catch (error) {
            assert.isNotNull(error, "Error should not be null");
        }
    });

    it("can get book by ID", async function () {
        // Call the server method and get the result
        const res = await Meteor.callAsync('server_getBookById', 1);
        // Assert that the result is not empty
        assert.isNotEmpty(res, 'Book should not be empty');
        const book: Book = res[0];

        assert.deepEqual(book, mockBook, "Fetched book should match the mock data");
      });

    it("can handle errors book by ID", async function () {
        try {
            await Meteor.callAsync('server_getBookById', -1);
        } catch (error) {
            assert.isNotNull(error, "Error should not be null");
        }
    });
  });
}


if (Meteor.isClient) {
  describe('Meteor Client Methods', function () {

    it('can get all books', async function () {
      // Call the server method and get the result
      const books = await getBooks();

      // Assert that the result is an array
      assert.isArray(books, 'Books should be an array');
      // Assert that the result is not empty
      assert.isNotEmpty(books, 'Books array should not be empty');
      assert.deepEqual(books, mockBooks, 'Fetched books should match the mock data');
    });

    it('can handle errors when fetching all books', async function () {
      try {
        await getBooks();
      } catch (error) {
        assert.isNotNull(error, 'Error should not be null');
      }
    });

    it('can get book by ID', async function () {
        // Call the server method and get the result
        const book = await getBookById("1");

        // Assert that the result is not empty
        assert.isNotEmpty(book, 'Book should not be empty');
        assert.deepEqual(book, mockBook, 'Fetched book should match the mock data');
    });

    it('can handle errors when fetching book by ID', async function () {
      try {
        await getBookById('5');
      } catch (error) {
        assert.isNotNull(error, 'Error should not be null');
      }
    });
  });
}
