import { Meteor } from "meteor/meteor";
import { executeQuery } from "./database";

Meteor.methods({
    async server_getGenres(): Promise<any> {
        return await executeQuery("SELECT * FROM Genres");
    },
    async server_getGenreId(id: number): Promise<any> {
        return await executeQuery("SELECT * FROM Genres WHERE id = ?", [id]);
    },
});
