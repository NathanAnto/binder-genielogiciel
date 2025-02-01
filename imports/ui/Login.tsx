import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { useNavigate } from "react-router-dom";

/**
 * LoginForm component to handle user login.
 * @returns {JSX.Element} The LoginForm component.
 */
export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /**
   * Handles the form submission to log in the user.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hashedPassword = Accounts._hashPassword(password);
    Meteor.loginWithPassword(username, hashedPassword.digest);
  };

  return (
    <div className="login-form-container">
      <form onSubmit={submit} className="login-form">
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Se connecter</button>
      </form>

      <p>
        Vous n'avez pas de compte ?{" "}
        <button
          onClick={() => navigate("/create-user")}
          className="create-account-button"
        >
          Créer un compte
        </button>
      </p>
    </div>
  );
};