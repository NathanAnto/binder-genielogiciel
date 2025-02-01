import { Meteor } from "meteor/meteor";
import Book from "../types/book";

<<<<<<< HEAD
export async function newBooking(user_id: number, book: Book) {
    await Meteor.callAsync('server_newBooking', user_id, book);
}

export async function getBookings(user_id: number) {
    return await Meteor.callAsync('server_getBookings', user_id);
}

export async function returnBooking(booking_id: number) {
    await Meteor.callAsync('server_returnBooking', booking_id);
}

export async function extendBooking(booking_id: number) {
=======
/**
 * Creates a new booking for a user.
 * @param {string} user_id - The ID of the user making the booking.
 * @param {Book} book - The book being booked.
 * @returns {Promise<void>} A promise that resolves when the booking is created.
 */
export async function newBooking(user_id: string, book: Book) {
    await Meteor.callAsync('server_newBooking', user_id, book);
}

/**
 * Fetches all bookings for a user.
 * @param {string} user_id - The ID of the user whose bookings to fetch.
 * @returns {Promise<any>} A promise that resolves to the list of bookings for the specified user.
 */
export async function getBookings(user_id: string) {
    return await Meteor.callAsync('server_getBookings', user_id);
}

/**
 * Deletes a booking by its ID.
 * @param {string} booking_id - The ID of the booking to delete.
 * @returns {Promise<void>} A promise that resolves when the booking is deleted.
 */
export async function returnBooking(booking_id: string) {
    await Meteor.callAsync('server_returnBooking', booking_id);
}

/**
 * Extends a booking by updating its booking date.
 * @param {string} booking_id - The ID of the booking to extend.
 * @returns {Promise<void>} A promise that resolves when the booking is extended.
 */
export async function extendBooking(booking_id: string) {
>>>>>>> create-user
    await Meteor.callAsync('server_extendBooking', booking_id);
}