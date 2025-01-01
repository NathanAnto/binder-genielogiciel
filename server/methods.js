import { Meteor } from 'meteor/meteor';
import { Book, Booking, UserPreference } from './db/models';
import { check } from 'meteor/check';

Meteor.methods({
  // Book Management Methods
  async 'books.insert'(bookData) {
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      const book = await Book.create(bookData);
      return book.id;
    } catch (error) {
      throw new Meteor.Error('db-error', error.message);
    }
  },

  async 'books.update'(bookId, bookData) {
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      const result = await Book.update(bookData, {
        where: { id: bookId }
      });
      return result;
    } catch (error) {
      throw new Meteor.Error('db-error', error.message);
    }
  },

  async 'books.remove'(bookId) {
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      return await Book.destroy({
        where: { id: bookId }
      });
    } catch (error) {
      throw new Meteor.Error('db-error', error.message);
    }
  },

  // Booking Management Methods
  async 'bookings.create'(bookId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in');
    }

    try {
      const book = await Book.findByPk(bookId);
      if (!book || !book.isAvailable) {
        throw new Meteor.Error('book-not-available');
      }

      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + book.bookingDuration);

      const booking = await Booking.create({
        userId: this.userId,
        bookId: bookId,
        startDate,
        endDate,
        status: 'active'
      });

      await book.update({ isAvailable: false });

      return booking.id;
    } catch (error) {
      throw new Meteor.Error('db-error', error.message);
    }
  },

  async 'bookings.return'(bookingId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in');
    }

    try {
      const booking = await Booking.findOne({
        where: {
          id: bookingId,
          userId: this.userId
        }
      });

      if (!booking) {
        throw new Meteor.Error('not-found');
      }

      await booking.update({
        status: 'completed',
        isReturned: true,
        returnDate: new Date()
      });

      await Book.update(
        { isAvailable: true },
        { where: { id: booking.bookId } }
      );

      return true;
    } catch (error) {
      throw new Meteor.Error('db-error', error.message);
    }
  },

  // User Preferences Methods
  async 'userPreferences.update'(preferences) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in');
    }

    try {
      const [userPref, created] = await UserPreference.findOrCreate({
        where: { userId: this.userId },
        defaults: preferences
      });

      if (!created) {
        await userPref.update(preferences);
      }

      return userPref.id;
    } catch (error) {
      throw new Meteor.Error('db-error', error.message);
    }
  }
}); 