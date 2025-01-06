import { Mongo } from "meteor/mongo";
import Book from "../types/book";

export const Books = new Mongo.Collection<Book>("books");