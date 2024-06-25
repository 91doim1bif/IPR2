import React, { useState, useEffect } from "react";
import Billboard from "./Billboard"; // Adjust import path according to your project structure
import MovieList from "./MovieList"; // Adjust import path according to your project structure
import InfoModal from "./InfoModal"; // Adjust import path according to your project structure
import useMovieList from "../../hooks/useMovieList";
import useFavorites from "../../hooks/useFavorites";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Navbar from "../Navbar/Navbar";

const Home: React.FC = () => {
  const { user: currentUser } = useCurrentUser();
  const { data: movies, isLoading: moviesLoading } = useMovieList();
  const {
    favorites,
    isLoading: favoritesLoading,
    fetchFavorites,
  } = useFavorites();
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

  // Refresh favorites whenever the modal is closed
  useEffect(() => {
    if (!isModalVisible) {
      fetchFavorites();
    }
  }, [isModalVisible, fetchFavorites, favorites.length]);

  if (moviesLoading || favoritesLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#141414] text-white">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-cover h-full bg-[#141414]">
      <Navbar />
      <Billboard onInfoClick={handleOpenModal} />
      <div className="pb-40">
        <MovieList
          title="Trending Now"
          data={movies}
          onInfoClick={handleOpenModal}
        />
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
