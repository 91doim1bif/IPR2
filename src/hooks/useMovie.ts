import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Movie {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

const useMovie = (movieId: string | null) => {
  const [data, setData] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovie = useCallback(async () => {
    if (!movieId) return;

    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3080/api/movies/${movieId}`
      );
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch movie");
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  return { data, isLoading, error };
};

export default useMovie;
