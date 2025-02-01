import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

/**
 * Profile component to display the user's profile and handle logout.
 * @param {Object} props - The component props.
 * @param {Function} props.onLogout - The function to call when the user logs out.
 * @returns {JSX.Element} The Profile component.
 */
export default function Profile({ onLogout }: { onLogout: () => void }) {  
  const user = Meteor.user();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('..'); // Navigate to the login page after logout
  };

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
