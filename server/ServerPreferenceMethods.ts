import { Meteor } from "meteor/meteor";
import { executeQuery } from "./database";

Meteor.methods({
    /**
     * Fetches all genres preferences for specific user from the database.
     * @returns {Promise<any>} A promise that resolves to the list of user genres.
     */
    async server_getUserPreferences(user_id: number): Promise<any> {
        return await executeQuery('SELECT * FROM Preferences WHERE user_id = ' + user_id);
    },
    
    /**
     * Creates a new user preference in the database.
     * @param {number} user_id - The user id.
     * @param {number} genre_id - The genre id.
     * @returns {Promise<any>} A promise that resolves when the preference is created.
     */
    async server_createPreference(user_id:number, genre_id: number): Promise<any> {
        return await executeQuery('INSERT INTO Preferences (user_id, genre_id) VALUES (?, ?)', [user_id, genre_id]);
    },
    
    /**
     * Removes a user preference in the database.
     * @param {number} user_id - The user id.
     * @param {number} genre_id - The genre id.
     * @returns {Promise<any>} A promise that resolves when the preference is removed.
     */
    async server_removePreference(user_id:number, genre_id: number): Promise<any> {
        return await executeQuery('DELETE FROM Preferences WHERE user_id = ? AND genre_id = ?, ', [user_id, genre_id]);
    }
})