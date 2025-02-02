import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { useNavigate } from "react-router-dom";
import { AdminContainer, AdminForm } from "./styles/AdminStyles";

/**
 * LoginForm component to handle user login.
 * @returns {JSX.Element} The LoginForm component.
 */
export const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    /**
     * Handles the form submission to log in the user.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const hashedPassword = Accounts._hashPassword(password);
        Meteor.loginWithPassword(username, hashedPassword.digest, (error) => {
            if (error) {
                console.error("Login failed:", error);
            } else {
                navigate("/"); // Navigate to the swipe page
            }
        });
    };

    return (
        <AdminContainer>
            <h1
                style={{
                    color: "#2c3e50",
                    textAlign: "center",
                    marginBottom: "30px",
                }}
            >
                Login
            </h1>
            <AdminForm onSubmit={submit}>
                {error && (
                    <div style={{ color: "red", marginBottom: "10px" }}>
                        {error}
                    </div>
                )}
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    required
                />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                />
                <button type='submit'>Login</button>
            </AdminForm>
            <p>No account yet ?</p>
            <button onClick={() => navigate("/create-user")} className="create-account-button">Create account</button>
        </AdminContainer>
    );
};
