import { Meteor } from "meteor/meteor";
import { insertGenre, removeGenre } from "/server/db";
import Genre from "/imports/types/genre";

Meteor.methods({
    'genre.insert'(res: { genreName: string}) {
        const genre: Genre = { name: res.genreName }
        insertGenre(genre);
    },
    'genre.remove'(res: {_id: string}) {
        removeGenre(res._id);
    }
})