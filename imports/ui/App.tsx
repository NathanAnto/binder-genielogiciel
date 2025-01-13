import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './Login';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  function onLogout() {
    Meteor.logout()
  };
  return (
    <div className="main">
      {user ? (
        <div>Bienvenue
          <button onClick={onLogout}>Logout</button>
        </div>
        
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
