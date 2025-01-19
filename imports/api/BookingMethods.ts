import { Meteor } from "meteor/meteor";
import Book from "../types/book";

export async function newBooking(user_id: string, book: Book) {
    await Meteor.callAsync('server_newBooking', user_id, book);
}

export async function getBookings(user_id: string) {
    return await Meteor.callAsync('server_getBookings', user_id);
}

export async function returnBooking(booking_id: string) {
    await Meteor.callAsync('server_returnBooking', booking_id);
}

export async function extendBooking(booking_id: string) {
    await Meteor.callAsync('server_extendBooking', booking_id);
}