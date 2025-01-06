import { useSubscribe, useTracker } from "meteor/react-meteor-data"
import Genre from "/imports/types/genre";
import { Genres } from "/imports/api/GenresColleciton";
import React from "react";

const GenreList: React.FC = () => {
    const isLoading = useSubscribe('genres');
    const genres: Genre[] = useTracker(() => Genres.find({}).fetch());

    if(isLoading()) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Genres</h1>
            <ul>
                {genres.map((genre) => (
                    <li key={genre._id}>
                        <h3>{genre.name}</h3>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GenreList;