import React, { useState } from 'react';
import Books from './Books';
import Admin from './Admin';
import Login from './Login';
import ErrorBoundary from './ErrorBoundary';

const App: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (adminStatus: boolean) => {
        console.log(adminStatus) 
        setIsAdmin(adminStatus);
        setIsLoggedIn(true);
    };

    console.log(isAdmin)
    console.log(isLoggedIn)

    if (!isLoggedIn) {
        return (
            <ErrorBoundary>
                <Login onLogin={handleLogin} />
            </ErrorBoundary>
        );
    }

    return (
        <ErrorBoundary>
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
        </ErrorBoundary>
    );
};

export default App;