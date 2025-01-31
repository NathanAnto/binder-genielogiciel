import React, { useState } from 'react';
import { AdminContainer, AdminForm } from './styles/AdminStyles';

interface LoginProps {
    onLogin: (isAdmin: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            onLogin(true);
        } else {
            onLogin(false);
        }
    };

    return (
        <AdminContainer>
            <h1 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '30px' }}>
                Login
            </h1>
            <AdminForm onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
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