import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { getUsers } from '/imports/api/UserMethods';
import { User } from '/imports/types/user';
import "./ServerBookMethods";
import "./ServerGenreMethods";
import "./ServerSwipeMethods";
import "./ServerUserMethods";

/**
 * This function runs on server startup. It resets the Accounts collection
 * by removing all existing users and then adds new users from the getUsers function.
 */
Meteor.startup(async () => {
  // Clear all existing users
  await Meteor.users.find().forEachAsync((user) => {
    Meteor.users.removeAsync(user._id);
  });

  // Add new users from getUsers
  const users: User[] = await getUsers();
  for (const user of users) {
    if (!(await Accounts.findUserByUsername(user.name))) {
      await Accounts.createUser({
        username: user.name,
        password: user.password,
        email: user.email,
      });
    }
  }
});
