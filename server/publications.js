import { Meteor } from 'meteor/meteor';
import { Books, Bookings, UserPreferences } from '../lib/collections';

// Publishes available books to all users
// Filters out unavailable books and limits fields for security
Meteor.publish('availableBooks', function() {
  return Books.find(
    { isAvailable: true },
    { 
      fields: {
        // Only publish necessary fields for the swipe interface
        title: 1,
        author: 1,
        genre: 1,
        description: 1,
        coverImage: 1,
        language: 1,
        pageCount: 1,
        compatibilityFactors: 1
      }
    }
  );
});

// Publishes user's active bookings
// Each user can only see their own bookings
Meteor.publish('userBookings', function() {
  if (!this.userId) return null;
  
  return Bookings.find({
    userId: this.userId,
    status: 'active'
  });
});

// Admin-only publications
// Provides full access to book data for administration
Meteor.publish('adminBooks', function() {
  if (!Roles.userIsInRole(this.userId, ['admin'])) return null;
  
  return Books.find({});
});

// Publishes statistics data for admin dashboard
Meteor.publish('adminStats', function() {
  if (!Roles.userIsInRole(this.userId, ['admin'])) return null;
  
  return Statistics.find({});
}); 