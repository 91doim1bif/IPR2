import React, { useState } from "react";
import Billboard from "./Billboard"; // Adjust the import path according to your project structure
import MovieList from "./MovieList"; // Adjust the import path according to your project structure
import InfoModal from "./InfoModal"; // Adjust the import path according to your project structure
import useMovieList from "../../hooks/useMovieList";
import useFavorites from "../../hooks/useFavorites";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Navbar from "../Navbar/Navbar";

const Home: React.FC = () => {
  const { user: currentUser } = useCurrentUser();
  const { data: movies, isLoading: moviesLoading } = useMovieList();
  const { favorites, isLoading: favoritesLoading } = useFavorites(
    currentUser?.favoriteIds || []
  );
  const [movieId, setMovieId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setMovieId(null);
  };

  const handleOpenModal = (id: string) => {
    setMovieId(id);
    setIsModalVisible(true);
  };

  if (moviesLoading || favoritesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-cover h-full bg-[#141414]">
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
      {movieId && (
        <InfoModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          movieId={movieId}
          setMovieId={setMovieId}
        />
      )}
    </div>
  );
};

export default Home;
