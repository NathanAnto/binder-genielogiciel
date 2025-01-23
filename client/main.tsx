import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import App from '/imports/ui/App';
import '/imports/api/BookMethods';

Meteor.startup(() => {
  try {
    const container = document.getElementById('react-target');
    if (!container) {
      throw new Error('Failed to find the root element');
    }
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Error starting the application:', error);
  }
});