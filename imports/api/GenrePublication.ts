import { Meteor } from "meteor/meteor";
import { GenresCollection } from "./GenresColleciton";

Meteor.publish("genres", () => {
    return GenresCollection.find();
});
