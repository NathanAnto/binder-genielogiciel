import { Meteor } from 'meteor/meteor';
import Book from '../types/book';

export async function swipLeft(): Promise<Book[]> {
  const books = await Meteor.callAsync('server_swipLeft');
  console.log('Swip Left');
  console.log(books)
  return books;
}

export async function swipRight(book_id: number): Promise<Book> {
  const books = await Meteor.callAsync('server_swipRight', book_id);
  console.log('Swip Right');
  return books[0];
}
