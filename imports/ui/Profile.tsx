import React, { FC } from 'react';

interface User {
  email: string;
}

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

export const Profile: FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="profile-container">
      <h1>Welcome, {user.email}</h1>
      <p>Your profile page</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};