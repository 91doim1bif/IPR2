import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Movie } from "../types/movie"; // Ensure the path is correct

const useHistories = () => {
  const [histories, setHistories] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null); // Clear previous error
      let profileID = localStorage.getItem("profile");

      const response = await axios.get(
        `http://localhost:3080/api/histories/${profileID}`
      );
      setHistories(response.data);
    } catch (error) {
      console.error("Failed to fetch histories", error);
      setError("Failed to fetch histories");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistories();
  }, [, fetchHistories]);

  return { histories, isLoading, error, fetchHistories };
};

export default useHistories;
