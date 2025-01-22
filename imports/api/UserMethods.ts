import { Meteor } from "meteor/meteor";
import { User } from "../types/user";

// Function to get all books
export async function getUsers(): Promise<User[]> {
    const users: User[] = await Meteor.callAsync('server_getUsers');
    return users;
}

export async function getUserByEmail(email: string): Promise<User> {
    const result: User[] = await Meteor.callAsync('server_getUserByEmail', email);
    return result[0];
}

export async function createUser(name: string, email: string, password: string): Promise<void> {
    const hashedPassword = await Meteor.callAsync('server_createUser', { name, email, password });
    return hashedPassword;
}