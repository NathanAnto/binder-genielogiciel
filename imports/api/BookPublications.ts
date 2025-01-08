import { Meteor } from "meteor/meteor";
import { BooksCollection } from "./BooksCollection";

Meteor.publish("books", () => {
    return BooksCollection.find();
});
