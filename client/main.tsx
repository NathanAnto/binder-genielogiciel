import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import App from './App';

// Cleanup function to handle unmounting
const cleanup = () => {
  const root = document.getElementById('react-target');
  if (root) {
    root.innerHTML = '';
  }
};

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  if (!container) {
    const div = document.createElement('div');
    div.id = 'react-target';
    document.body.appendChild(div);
  }
  
  const root = createRoot(container || document.getElementById('react-target')!);
  root.render(<App />);

  // Use modern event listener
  window.addEventListener('beforeunload', cleanup);
});
