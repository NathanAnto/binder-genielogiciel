import { Meteor } from "meteor/meteor";
import { executeQuery } from "./database";
import { User } from "/imports/types/user";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
    /**
     * Fetches all users from the database.
     * @returns {Promise<any>} A promise that resolves to the list of all users.
     */
    async server_getUsers(): Promise<any> {
        const sql = 'SELECT * FROM Users';
        return await executeQuery(sql);
    },

    /**
     * Fetches a user by their email from the database.
     * @param {string} email - The email of the user to fetch.
     * @returns {Promise<any>} A promise that resolves to the user with the specified email.
     */
    async server_getUserByEmail(email: string): Promise<any> {
        const sql = 'SELECT * FROM Users WHERE email = ?';
        return await executeQuery(sql, [email]);
    },

    /**
     * Creates a new user in the database.
     * @param {User} user - The user object containing user details.
     * @returns {Promise<any>} A promise that resolves when the user is created.
     * @throws {Meteor.Error} If a user with the same email already exists or if there is a server error.
     */
    async server_createUser(user: User): Promise<any> {    
        const cleanedEmail = user.email.trim().toLowerCase();
    
        // Use findOneAsync to search for the user
        const existingUser = await Meteor.users.findOneAsync({ 'emails.address': cleanedEmail });
        if (existingUser) {
          console.error("Existing user found:", existingUser);
          throw new Meteor.Error('user-exists', 'A user with this email already exists.');
        }

        // Create the user
        const userId = Accounts.createUser({
            username: user.name,
            email: cleanedEmail,
            password: user.password,
        });

        console.log("User created successfully, ID:", userId);
        const sql = 'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)';
        return await executeQuery(sql, [user.name, user.email, user.password]);
    },

    /**
     * Checks user credentials.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<Object>} A promise that resolves to an object indicating if the user is valid and if they are an admin.
     */
    async server_checkUserCredentials(email: string, password: string): Promise<any> {
        // First check for hardcoded admin credentials
        if (email === 'admin' && password === 'admin') {
            return { isValid: true, isAdmin: true };
        }

        // Then check database users
        const sql = `
            SELECT is_admin 
            FROM Users 
            WHERE email = ? AND password = ?
        `;
        
        const user = await executeQuery(sql, [email, password]);
        
        if (user && user.length > 0) {
            return { 
                isValid: true, 
                isAdmin: user[0].is_admin === 1 
            };
        }

        return { isValid: false, isAdmin: false };
    }
});
