import React, { useState, useEffect } from "react";
import Billboard from "./Billboard"; // Adjust import path according to your project structure
import MovieList from "./MovieList"; // Adjust import path according to your project structure
import InfoModal from "./InfoModal"; // Adjust import path according to your project structure
import useMovieList from "../../hooks/useMovieList";
import useFavorites from "../../hooks/useFavorites";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Navbar from "../Navbar/Navbar";

const MyList: React.FC = () => {
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
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <div className="py-20 px-4">
        <MovieList
          title="My List"
          data={favorites}
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

export default MyList;
