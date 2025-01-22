import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e: any) => {
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
