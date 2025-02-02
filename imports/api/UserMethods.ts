import { Meteor } from "meteor/meteor";
import { User } from "../types/user";

/**
 * Fetches all users from the server.
 * @returns {Promise<User[]>} A promise that resolves to the list of all users.
 */
export async function getUsers(): Promise<User[]> {
    let users: User[];
    try {
        users = await Meteor.callAsync('server_getUsers');
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
    return users;
}

/**
 * Fetches a user by their email from the server.
 * @param {string} email - The email of the user to fetch.
 * @returns {Promise<User>} A promise that resolves to the user with the specified email.
 */
export async function getUserByEmail(email: string): Promise<User> {
    let result: User[];
    try {
        result = await Meteor.callAsync('server_getUserByEmail', email);
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
    return result[0];
}

/**
 * Creates a new user on the server.
 * @param {User} user - The user object containing user details.
 * @returns {Promise<void>} A promise that resolves when the user is created.
 */
export async function createUser(user: User): Promise<void> {
    try {
        await Meteor.callAsync('server_createUser', user);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

/**
 * Checks user credentials and admin status.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<{isValid: boolean, isAdmin: boolean}>} A promise that resolves to an object containing the validity and admin status of the user.
 */
export async function checkUserCredentials(email: string, password: string): Promise<{isValid: boolean, isAdmin: boolean}> {
    try {
        const result = await Meteor.callAsync('server_checkUserCredentials', email, password);
        return result;
    } catch (error) {
        console.error('Error checking credentials:', error);
        throw error;
    }
}
