import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { getUsers } from '/imports/api/UserMethods';
import { User } from '/imports/types/user';
<<<<<<< HEAD

import "./ServerBookMethods";
import "./ServerGenreMethods";
import "./ServerSwipeMethods";
import "./ServerUserMethods";
=======
import './ServerBookMethods';
import './ServerSwipeMethods';
import './ServerUserMethods';
>>>>>>> create-user

Meteor.startup(async () => {
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
