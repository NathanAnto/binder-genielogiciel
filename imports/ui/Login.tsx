import React, { useState } from 'react';
import { AdminContainer, AdminForm } from './styles/AdminStyles';
import { Meteor } from 'meteor/meteor';

interface LoginProps {
    onLogin: (isAdmin: boolean) => void;
}

// Login component handling user authentication and admin access
const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Check admin credentials
            if (email === 'admin' && password === 'admin') {
                onLogin(true);
                return;
            }

            // Verify user credentials
            const result = await Meteor.callAsync('server_checkUserCredentials', email, password);
            console.log('Login result:', result); // For debugging

            if (result.isValid) {
                onLogin(result.isAdmin);
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login');
        }
    };

    return (
        <AdminContainer>
            <h1 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '30px' }}>
                Login
            </h1>
            <AdminForm onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </AdminForm>
        </AdminContainer>
    );
};

export default Login; 