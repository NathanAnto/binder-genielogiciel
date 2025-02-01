import { Meteor } from "meteor/meteor";
import { User } from "../types/user";

/**
 * Fetches all users from the server.
 * @returns {Promise<User[]>} A promise that resolves to the list of all users.
 */
export async function getUsers(): Promise<User[]> {
    const users: User[] = await Meteor.callAsync('server_getUsers');
    return users;
}

/**
 * Fetches a user by their email from the server.
 * @param {string} email - The email of the user to fetch.
 * @returns {Promise<User>} A promise that resolves to the user with the specified email.
 */
export async function getUserByEmail(email: string): Promise<User> {
    const result: User[] = await Meteor.callAsync('server_getUserByEmail', email);
    return result[0];
}

/**
 * Creates a new user on the server.
 * @param {User} user - The user object containing user details.
 * @returns {Promise<void>} A promise that resolves when the user is created.
 */
export async function createUser(user: User): Promise<void> {
    return await Meteor.callAsync('server_createUser', user);
}