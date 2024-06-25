import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: Date;
  favoriteIds: string[];
}

interface UseCurrentUserResult {
  user: User | null;
  loading: boolean;
  error: string | null;
  mutate: () => Promise<void>;
}

export const useCurrentUser = (): UseCurrentUserResult => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:3080/api/currentUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    } catch (err) {
      setError("Failed to fetch current user");
    } finally {
      setLoading(false);
    }
  }, []);

  const mutate = async () => {
    await fetchCurrentUser();
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return { user, loading, error, mutate };
};
