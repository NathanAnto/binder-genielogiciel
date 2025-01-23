import React, { useState } from 'react';

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
        <div className="admin-container">
            <h1>Giriş Yap</h1>
            <form onSubmit={handleSubmit} className="admin-form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Kullanıcı Adı"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifre"
                    required
                />
                <button type="submit">Giriş</button>
            </form>
        </div>
    );
};

export default Login; 