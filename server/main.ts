import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { getUsers } from '/imports/api/UserMethods';
import { User } from '/imports/types/user';
import './ServerBookMethods';
import './ServerSwipeMethods';

Meteor.methods({
  'server_createUser': function ({ name, email, password }: { name: string; email: string; password: string }) {
    if (!name || !email || !password) {
      throw new Meteor.Error('invalid-arguments', 'Tous les champs sont obligatoires.');
    }

    // Vérifiez si l'utilisateur existe déjà
    if (Accounts.findUserByEmail(email)) {
      throw new Meteor.Error('user-exists', 'Un utilisateur avec cet email existe déjà.');
    }

    // Créez l'utilisateur
    const userId = Accounts.createUser({
      username: name,
      email,
      password,
    });

    return userId; // Facultatif, peut être utilisé pour confirmation
  },
});

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
