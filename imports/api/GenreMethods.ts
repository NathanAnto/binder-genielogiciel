import { Meteor } from "meteor/meteor";
import Genre from "../types/genre";

/**
 * Fetches all genres from the server.
 * @returns {Promise<Genre[]>} A promise that resolves to the list of all genres.
 */
export async function getGenres(): Promise<Genre[]> {
    const genres: Genre[] = await Meteor.callAsync('server_getGenres');
    return genres;
}

/**
 * Fetches a genre by their email from the server.
 * @param {number} id - The id of the genre to fetch.
 * @returns {Promise<Genre>} A promise that resolves to the genre with the specified id.
 */
export async function getGenreById(id: number): Promise<Genre> {
    const result: Genre[] = await Meteor.callAsync('server_getGenreById', id);
    return result[0];
}

/**
 * Creates a new genre on the server.
 * @param {Genre} genre - The genre object containing genre name.
 * @returns {Promise<void>} A promise that resolves when the genre is created.
 */
export async function createGenre(genre: Genre): Promise<void> {
    return await Meteor.callAsync('server_createGenre', genre);
}