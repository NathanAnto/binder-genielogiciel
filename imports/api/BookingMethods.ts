import { Meteor } from "meteor/meteor";
import Book from "../types/book";

/**
 * Creates a new booking for a user.
 * @param {number} user_id - The ID of the user making the booking.
 * @param {Book} book - The book being booked.
 * @returns {Promise<void>} A promise that resolves when the booking is created.
 */
export async function newBooking(user_id: string, book: Book): Promise<void> {
    try {
        await Meteor.callAsync('server_newBooking', user_id, book);
    } catch (error) {
        console.error('Error creating new booking:', error);
        throw error;
    }
}

/**
 * Fetches all bookings for a user.
 * @param {number} user_id - The ID of the user whose bookings to fetch.
 * @returns {Promise<any>} A promise that resolves to the list of bookings for the specified user.
 */
export async function getBookings(user_id: string): Promise<any> {
    try {
        const bookings = await Meteor.callAsync('server_getBookings', user_id);
        return bookings;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
}

/**
 * Deletes a booking by its ID.
 * @param {number} booking_id - The ID of the booking to delete.
 * @returns {Promise<void>} A promise that resolves when the booking is deleted.
 */
export async function returnBooking(booking_id: string): Promise<void> {
    try {
        await Meteor.callAsync('server_returnBooking', booking_id);
    } catch (error) {
        console.error('Error deleting booking:', error);
        throw error;
    }
}

/**
 * Extends a booking by updating its booking date.
 * @param {number} booking_id - The ID of the booking to extend.
 * @returns {Promise<void>} A promise that resolves when the booking is extended.
 */
export async function extendBooking(booking_id: string): Promise<void> {
    try {
        await Meteor.callAsync('server_extendBooking', booking_id);
    } catch (error) {
        console.error('Error extending booking:', error);
        throw error;
    }
}
