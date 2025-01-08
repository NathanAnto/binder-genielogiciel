import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import Genre from "/imports/types/genre";
import { GenresCollection } from "/imports/api/GenresColleciton";
import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

const GenreList: React.FC = () => {
    const isLoading = useSubscribe("genres");
    const genres: Genre[] = useTracker(() => GenresCollection.find({}).fetch());

    const [genreName, setGenreName] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!genreName) return;

        await Meteor.callAsync("genre.insert", {
            genreName: genreName.trim(),
        });

        setGenreName("");
    };

    const handleRemove = (res: { _id?: string }) => {
        Meteor.callAsync('genre.remove', res)
    };

    if (isLoading()) {
        return <div>Loading...</div>;
    }
    genreName;

    return (
        <div>
            <h1>Genres</h1>
            <ul>
                {genres.map((genre) => (
                    <li key={genre._id}>
                        <h3>
                            {genre.name}
                            <button onClick={() => handleRemove({_id: genre._id})}>Remove</button>
                        </h3>
                    </li>
                ))}
            </ul>
            <h2>Create new Genre:</h2>
            <form id='new-genre-form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Type to add new tasks'
                    value={genreName}
                    onChange={(e) => setGenreName(e.target.value)}
                />

                <button type='submit'>Add Genre</button>
            </form>
        </div>
    );
};

export default GenreList;
