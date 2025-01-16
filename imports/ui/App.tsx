import React, { useState } from 'react';
import Books from './Books';
import Admin from './Admin';
import Login from './Login';

export const App = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (adminStatus: boolean) => {
        setIsAdmin(adminStatus);
        setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div>
            <button 
                onClick={() => setIsLoggedIn(false)}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '8px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Logout
            </button>

            {isAdmin ? (
                <Admin />
            ) : (
                <>
                    <h1>Welcome to Binder</h1>
                    <Books />
                </>
            )}
        </div>
    );
};
