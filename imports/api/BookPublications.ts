import { Meteor } from "meteor/meteor";
import { Books } from "./BooksCollection";

Meteor.publish("books", () => {
    return Books.find();
});
