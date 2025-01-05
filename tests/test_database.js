import { Meteor } from 'meteor/meteor';
import { executeQuery } from '.database';

Meteor.startup(async () => {
    console.log('Booking App Server Started');

    try {
        const books = await executeQuery('SELECT title FROM Books');
        console.log('Books: ', books)
    } catch (err) {
        console.error('Database error: ', err)
    }
});