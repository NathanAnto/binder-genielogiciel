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
        return await executeQuery('SELECT * FROM Users');
    },

    /**
     * Fetches a user by their email from the database.
     * @param {string} email - The email of the user to fetch.
     * @returns {Promise<any>} A promise that resolves to the user with the specified email.
     */
    async server_getUserByEmail(email: string): Promise<any> {
        return await executeQuery('SELECT * FROM Users WHERE email = ?', [email]);
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

        try {
          // Create the user
          const userId = Accounts.createUser({
            username: user.name,
            email: cleanedEmail,
            password: user.password,
          });

          console.log("User created successfully, ID:", userId);
          return await executeQuery('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
        } catch (error) {
          console.error("Error creating user:", error);
          throw new Meteor.Error('server-error', 'Internal server error while creating the user.');
        }
    }
});