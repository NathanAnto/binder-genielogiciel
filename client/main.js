import { Meteor } from 'meteor/meteor';
import { Books } from '../lib/collections';

// Yayına abone ol
Meteor.subscribe('books');

// Kitapları listele
Template.booksList.helpers({
  books() {
    return Books.find();
  }
}); 