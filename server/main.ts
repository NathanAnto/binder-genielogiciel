import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { getUsers } from '/imports/api/UserMethods';
import { User } from '/imports/types/user';
import './ServerBookMethods';
import './ServerGenreMethods';
import './ServerPreferenceMethods';
import './ServerSwipeMethods';
import './ServerUserMethods';

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
