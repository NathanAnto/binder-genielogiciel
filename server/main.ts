import { Meteor } from 'meteor/meteor';
import '/server/api'; // Import the API definitions

import '/imports/api/BookMethods';

Meteor.startup(async () => {
  // Any additional startup logic here
});
