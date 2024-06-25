import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  FC,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  googleLogin: () => void;
  githubLogin: () => void;
  mutate: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/api/currentUser");
      console.log(response.data);
      setUser(response.data);
    } catch (err) {
      setError("Failed to fetch current user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/api/signin", {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      navigate("/profiles");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/api/signup", {
        name,
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      navigate("/profiles");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/auth");
  };

  const googleLogin = () => {
    window.location.href = `${
      process.env.REACT_APP_API_BASE_URL || "http://localhost:3080"
    }/auth/google`;
  };

  const githubLogin = () => {
    window.location.href = `${
      process.env.REACT_APP_API_BASE_URL || "http://localhost:3080"
    }/auth/github`;
  };

  const mutate = async () => {
    await fetchCurrentUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        googleLogin,
        githubLogin,
        mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
