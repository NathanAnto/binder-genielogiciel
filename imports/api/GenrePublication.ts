import { Meteor } from "meteor/meteor";
import { Genres } from "./GenresColleciton";

Meteor.publish("genres", () => {
    return Genres.find();
});
