import { Meteor } from "meteor/meteor";
import { executeQuery } from "./database";

Meteor.methods({
    /**
     * Fetches all genres from the database.
     * @returns {Promise<any>} A promise that resolves to the list of genres.
     */
    async server_getGenres(): Promise<any> {
        const sql = 'SELECT id, name FROM Genres ORDER BY name';
        return await executeQuery(sql);
    },

    /**
     * Fetches a genre by its ID from the database.
     * @param {number} id - The ID of the genre to fetch.
     * @returns {Promise<any>} A promise that resolves to the genre with the specified ID.
     */
    async server_getGenreId(id: number): Promise<any> {
        const sql = 'SELECT * FROM Genres WHERE id = ?';
        return await executeQuery(sql, [id]);
    }
});
