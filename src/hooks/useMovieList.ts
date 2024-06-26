import { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "../types/movie"; // Adjust the import path as needed

interface MovieData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

const useMovieList = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3080/api/movies");
        //console.log(response.data);
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
