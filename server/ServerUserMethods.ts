import { Meteor } from "meteor/meteor";
import { executeQuery } from "./database";

Meteor.methods({
    async server_getUsers(): Promise<any> {
        return await executeQuery('SELECT * FROM Users');
    },
    async server_getUserByEmail(email: string): Promise<any> {
        return await executeQuery('SELECT * FROM Users WHERE email = ?', [email]);
    },
})