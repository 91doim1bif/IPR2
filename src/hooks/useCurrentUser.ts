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
      const response = await axios.get("/api/currentUser");
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
