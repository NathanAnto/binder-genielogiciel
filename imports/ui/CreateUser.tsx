import React, { useState } from "react";
import { createUser } from "../api/UserMethods";
import { useNavigate } from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";


export const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    try {
      await createUser({
        name: name,
        email: email,
        password: Accounts._hashPassword(password).digest,
        is_admin: 0
      }); // Appel de la méthode client
      navigate("/");
    } catch (err) {
      if (err instanceof Meteor.Error) {
        alert(`Erreur : ${err.reason}`);
      } else {
        alert("Une erreur inattendue est survenue.");
      }
    }
  };

  return (
    <form onSubmit={handleCreateUser} className="create-user-form">
      <label htmlFor="name">Nom</label>
      <input
        type="text"
        placeholder="Nom"
        name="name"
        required
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Email"
        name="email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        placeholder="Mot de passe"
        name="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Créer un compte</button>
    </form>
  );
};
