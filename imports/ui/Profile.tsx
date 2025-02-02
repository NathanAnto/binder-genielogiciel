import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPreferences } from "../api/PreferenceMethods";
import { Preference } from "../types/preference";
import { Genre } from "../types/genre";
import { getGenres } from "../api/GenreMethods";
import { useCurrentUser } from "../api/useCurrentUser";
import Admin from "./Admin";

/**
 * Profile component to display the user's profile and handle logout.
 * @param {Object} props - The component props.
 * @param {Function} props.onLogout - The function to call when the user logs out.
 * @returns {JSX.Element} The Profile component.
 */
export default function Profile({ onLogout }: { onLogout: () => void }) {
    const [genres, setGenres] = useState<Genre[]>([]);
    const navigate = useNavigate();

    const { user, loading, error } = useCurrentUser();

    getUserPreferences(user?.id!).then((preferences: Preference[]) => {
        getGenres().then((genres: Genre[]) => {
            const idSet = new Set(preferences.map((p) => p.genre_id));
            setGenres(genres.filter((g: Genre) => idSet.has(g.id!)));
        });
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>Not logged in</div>;

    const handleLogout = () => {
        onLogout();
        navigate(".."); // Navigate to the login page after logout
    };

    return (
        <div>
            <h1>Welcome, {user?.name}</h1>
            <div>
                <h2>Preferences</h2>
                {genres.map((genre: Genre) => {
                    return (
                        <div key={genre.id}>
                            <p>{genre.name}</p>
                        </div>
                    );
                })}
                {user.is_admin ? <div>{<Admin />}</div> : <div></div>}
            </div>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
