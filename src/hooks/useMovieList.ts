import { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "../types/movie"; // Adjust the import path as needed

const useMovieList = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/api/movies");
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch movies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { data, isLoading, error };
};

export default useMovieList;
