import React, { useState, useEffect } from "react";
import Billboard from "./Billboard"; // Adjust import path according to your project structure
import MovieList from "./MovieList"; // Adjust import path according to your project structure
import InfoModal from "./InfoModal"; // Adjust import path according to your project structure
import useMovieList from "../../hooks/useMovieList";
import useFavorites from "../../hooks/useFavorites";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import useHistories from "../../hooks/useHistories";

const Home: React.FC = () => {
  const { user: currentUser } = useCurrentUser();
  const { data: movies, isLoading: moviesLoading } = useMovieList();
  const {
    favorites,
    isLoading: favoritesLoading,
    fetchFavorites,
  } = useFavorites();
  const { histories, isLoading: historiesLoading } = useHistories();
  const [movieId, setMovieId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>();

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setMovieId(null);
  };

  const handleOpenModal = (id: string) => {
    setMovieId(id);
    setIsModalVisible(true);
  };

  useEffect(() => {
    const profileId = localStorage.getItem("profile");
    if (profileId) {
      axios
        .get(`http://localhost:3080/api/profile/${profileId}`)
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          console.error("Error fetching profile name:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (!isModalVisible) {
      fetchFavorites();
    }
  }, [fetchFavorites, histories.length]);

  if (moviesLoading || favoritesLoading || historiesLoading) {
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
      {histories.length > 0 && profile && (
        <div className="pb-40">
          <MovieList
            title={`Mit dem Profil von ${profile.name} weiter anschauen`}
            data={histories}
            onInfoClick={handleOpenModal}
            history={true}
          />
        </div>
      )}
      <div className="pb-40">
        <MovieList
          title="Trending Now"
          data={movies}
          onInfoClick={handleOpenModal}
          history={false}
        />
      </div>
      {isModalVisible && movieId && (
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
