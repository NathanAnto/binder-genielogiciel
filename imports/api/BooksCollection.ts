import { Mongo } from "meteor/mongo";
import Book from "../types/book";

export const BooksCollection = new Mongo.Collection<Book>("books");