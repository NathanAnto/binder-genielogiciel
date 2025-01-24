import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { getUsers } from '/imports/api/UserMethods';
import { User } from '/imports/types/user';
import './ServerBookMethods';
import './ServerSwipeMethods';


Meteor.methods({
  'server_createUser': async function ({ name, email, password }: { name: string; email: string; password: string }) {
    console.log("Début de la méthode server_createUser");

    if (!name || !email || !password) {
      console.error("Champs manquants : ", { name, email, password });
      throw new Meteor.Error('invalid-arguments', 'Tous les champs sont obligatoires.');
    }

    const cleanedEmail = email.trim().toLowerCase();
    console.log("Email nettoyé :", cleanedEmail);

    // Utiliser findOneAsync pour rechercher l'utilisateur
    const existingUser = await Meteor.users.findOneAsync({ 'emails.address': cleanedEmail });
    if (existingUser) {
      console.error("Utilisateur existant trouvé :", existingUser);
      throw new Meteor.Error('user-exists', 'Un utilisateur avec cet email existe déjà.');
    }

    try {
      // Créer l'utilisateur
      const userId = Accounts.createUser({
        username: name,
        email: cleanedEmail,
        password,
      });
      console.log("Utilisateur créé avec succès, ID :", userId);

      return userId; // Retourner l'ID utilisateur pour confirmation
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      throw new Meteor.Error('server-error', 'Erreur interne lors de la création de l\'utilisateur.');
    }
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
