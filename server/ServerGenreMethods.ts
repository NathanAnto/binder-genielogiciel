import { Meteor } from "meteor/meteor";
import { executeQuery } from "./database";

Meteor.methods({
    /**
     * Fetches all genres from the database.
     * @returns {Promise<any>} A promise that resolves to the list of all genres.
     */
    async server_getGenres(): Promise<any> {
        return await executeQuery('SELECT * FROM Genres');
    },

    /**
     * Fetches a genre by its ID from the database.
     * @param {string} id - The ID of the genre to fetch.
     * @returns {Promise<any>} A promise that resolves to the genre with the specified ID.
     */
    async server_getGenreById(id: number): Promise<any> {
        return await executeQuery('SELECT * FROM Genres WHERE id = ?', [id]);
    },
})
