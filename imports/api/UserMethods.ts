// API methods for user operations
import { Meteor } from "meteor/meteor";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    is_admin: number;
}

// Check user credentials and admin status
export async function checkUserCredentials(email: string, password: string): Promise<{isValid: boolean, isAdmin: boolean}> {
    try {
        const result = await Meteor.callAsync('server_checkUserCredentials', email, password);
        return result;
    } catch (error) {
        console.error('Error checking credentials:', error);
        throw error;
    }
}