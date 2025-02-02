import { Meteor } from "meteor/meteor";

/**
 * Fetches all genres preferences for specific user from the database.
 * @returns {Promise<any>} A promise that resolves to the list of user genres.
 */
export async function getUserPreferences(user_id: number): Promise<any> {
    const preferences = await Meteor.callAsync('server_getUserPreferences', user_id);
    return preferences;
}

/**
 * Creates a new user preference in the database.
 * @param {number} user_id - The user id.
 * @param {number} genre_id - The genre id.
 * @returns {Promise<any>} A promise that resolves when the preference is created.
 */
export async function createPreference(user_id:number, genre_id: number): Promise<any> {
    await Meteor.callAsync('server_createPreference', user_id, genre_id);
}

/**
 * Removes a user preference in the database.
 * @param {number} user_id - The user id.
 * @param {number} genre_id - The genre id.
 * @returns {Promise<any>} A promise that resolves when the preference is removed.
 */
export async function removePreference(user_id:number, genre_id: number): Promise<any> {
    await Meteor.callAsync('server_removePreference', user_id, genre_id);
}