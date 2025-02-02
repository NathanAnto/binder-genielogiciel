import React, { useEffect, useState } from "react";
import { createUser, getUserByEmail } from "../api/UserMethods";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { getGenres } from "../api/GenreMethods";
import { Genre } from "../types/genre";
import { createPreference } from "../api/PreferenceMethods";
import { User } from "../types/user";
import { AdminContainer, AdminForm } from "./styles/AdminStyles";

/**
 * CreateUser component to handle user registration.
 * @returns {JSX.Element} The CreateUser component.
 */
export const CreateUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch genres from the database
        getGenres()
            .then((genres: Genre[]) => setGenres(genres))
            .catch((error: Error) =>
                console.error("Error getting genres:", error)
            );
    }, []);
    /**
     * Handles the form submission to create a new user.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (password1 != password2) throw Error("Passwords do not match !");

            await createUser({
                name: name,
                email: email,
                password: Accounts._hashPassword(password1).digest,
                is_admin: 0,
            }); // Call the client method

            const newUser: User = await getUserByEmail(email);

            selectedGenres.forEach((genre) => {
                createPreference(newUser.id!, genre.id!);
            });

            navigate("/");
        } catch (err) {
            if (err instanceof Meteor.Error) {
                alert(`Erreur : ${err.reason}`);
            } else {
                alert("Une erreur inattendue est survenue.");
            }
        }
    };

    const handleGenreSelection = (genreId: number) => {
        if (selectedGenres.some((genre: Genre) => genre.id === genreId)) {
            setSelectedGenres(
                selectedGenres.filter((genre: Genre) => genre.id !== genreId)
            );
        } else {
            const genre = genres.find((genre) => genre.id === genreId);
            if (genre) {
                setSelectedGenres([...selectedGenres, genre]);
            }
        }
    };

    return (
        <AdminContainer className='create-user-form'>
            <AdminForm onSubmit={handleCreateUser}>
              <h1>Create Account</h1>
                <label htmlFor='name'>Nom</label>
                <input
                    type='text'
                    placeholder='Nom'
                    name='name'
                    required
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    placeholder='Email'
                    name='email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor='password'>Mot de passe</label>
                <input
                    type='password'
                    placeholder='Mot de passe'
                    name='password'
                    required
                    onChange={(e) => setPassword1(e.target.value)}
                />

                <label htmlFor='password2'>Répéter le mot de passe</label>
                <input
                    type='password'
                    placeholder='Répéter le mot de passe'
                    name='password2'
                    required
                    onChange={(e) => setPassword2(e.target.value)}
                />

                <label htmlFor='genres'>Genres de préférence</label>
                <ul>
                    {genres.map((genre) => (
                        <li key={genre.id}>
                            <input
                                type='checkbox'
                                id={`genre-${genre.id}`}
                                checked={selectedGenres.some(
                                    (selectedGenre) =>
                                        selectedGenre.id === genre.id
                                )}
                                onChange={() => handleGenreSelection(genre.id!)}
                            />
                            <label htmlFor={`genre-${genre.id}`}>
                                {genre.name}
                            </label>
                        </li>
                    ))}
                </ul>

                <button type='submit'>Créer un compte</button>
              </AdminForm>
              <button onClick={() => navigate("/")} className="create-account-button">Return to login</button>
            </AdminContainer>
    );
};
