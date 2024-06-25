import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Movie } from "../types/movie"; // Ensure the path is correct

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null); // Clear previous error
      let profileID = localStorage.getItem("profile");

      const response = await axios.get(
        `http://localhost:3080/api/favorites/${profileID}`
      );
      setFavorites(response.data);
    } catch (error) {
      console.error("Failed to fetch favorites", error);
      setError("Failed to fetch favorites");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [, fetchFavorites]);

  return { favorites, isLoading, error, fetchFavorites };
};

export default useFavorites;
