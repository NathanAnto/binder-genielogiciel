import React from 'react';
import { Meteor } from 'meteor/meteor';
import Reservations from './Reservations';

export default function Profile({ onLogout }: { onLogout: () => void }) {  
  const user = Meteor.user();

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <button onClick={onLogout}>Logout</button>

      <Reservations />
    </div>
  );
}