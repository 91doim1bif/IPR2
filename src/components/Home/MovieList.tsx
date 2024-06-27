import React, { useState } from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
import InfoModal from "./InfoModal"; // Passe den Pfad an deine Projektstruktur an
import { Movie } from "../../types/movie"; // Passe den Importpfad an deine Projektstruktur an

interface MovieListProps {
  data: Movie[];
  title: string;
  onInfoClick: (movieId: string) => void; // Funktion zum Anzeigen weiterer Informationen
  history: boolean;
}

const MovieList: React.FC<MovieListProps> = ({
  data,
  title,
  onInfoClick,
  history,
}) => {
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  if (isEmpty(data)) {
    return (
      <div className="px-4 md:px-12 mt-4 space-y-8">
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold">
          {title}
        </p>
        <p className="text-white">No movies found</p>
      </div>
    );
  }

  // Limit the number of displayed movies to 4
  const moviesToDisplay = data.slice(0, 4);

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold">
        {title}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {moviesToDisplay.map((movie) => (
          <MovieCard
            key={movie._id}
            data={movie}
            onInfoClick={onInfoClick}
            history={history}
          />
        ))}
      </div>
      {selectedMovieId && (
        <InfoModal
          visible={!!selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
          movieId={selectedMovieId}
          setMovieId={setSelectedMovieId}
        />
      )}
    </div>
  );
};

export default MovieList;
//test