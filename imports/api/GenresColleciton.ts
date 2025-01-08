import { Mongo } from "meteor/mongo";
import Genre from "../types/genre";

export const GenresCollection = new Mongo.Collection<Genre>("genres");