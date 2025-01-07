import { Meteor } from "meteor/meteor";
import Genre from "/imports/types/genre";
import { Genres } from "/imports/api/GenresColleciton";

Meteor.methods({
    'genre.insert'(res: { genreName: string}) {
        const genre: Genre = { name: res.genreName }

        console.log('Adding new genre: ', genre.name);
        Genres.insertAsync(genre);
    },
    'genre.remove'(res: {_id: string}) {
        console.log('Removing genre with id: ', res._id);
        Genres.removeAsync(res._id)
    }
})