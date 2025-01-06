import { Mongo } from "meteor/mongo";
import Genre from "../types/genre";

export const Genres = new Mongo.Collection<Genre>("genres");