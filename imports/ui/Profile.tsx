import React from 'react';
import { Meteor } from 'meteor/meteor';

/**
 * Profile component to display the user's profile and handle logout.
 * @param {Object} props - The component props.
 * @param {Function} props.onLogout - The function to call when the user logs out.
 * @returns {JSX.Element} The Profile component.
 */
export default function Profile({ onLogout }: { onLogout: () => void }) {  
  const user = Meteor.user();

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}