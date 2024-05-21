import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useFavorites from "../../hooks/useFavorites";
import { Movie } from "../../types/movie"; // Ensure the path is correct

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { user: currentUser, mutate: mutateUser } = useCurrentUser();
  const { favorites, isLoading, fetchFavorites } = useFavorites(
    currentUser?.favoriteIds || []
  );

  const isFavorite = useMemo(() => {
    return favorites.some((movie) => movie.id === movieId);
  }, [favorites, movieId]);

  const toggleFavorite = useCallback(async () => {
    if (!currentUser) {
      return;
    }

    try {
      let response;
      if (isFavorite) {
        response = await axios.delete(`/api/favorite/${movieId}`);
      } else {
        response = await axios.post("/api/favorite", { movieId });
      }

      if (response.status === 200) {
        fetchFavorites(); // Refetch favorites after toggling
        mutateUser(); // Refetch user data
      }
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  }, [currentUser, isFavorite, movieId, fetchFavorites, mutateUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      onClick={toggleFavorite}
      className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-white
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-neutral-300
      "
    >
      {isFavorite ? (
        <AiOutlineCheck className="text-white" size={25} />
      ) : (
        <AiOutlinePlus className="text-white" size={25} />
      )}
    </div>
  );
};

export default FavoriteButton;
