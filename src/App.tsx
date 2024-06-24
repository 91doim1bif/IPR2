import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profiles from "./components/Profiles/Profiles";
import Auth from "./components/Authentifcation/Auth";
import Home from "./components/Home/Home";
import Settings from "./components/Settings/Settings";
import {
  AuthProvider,
  useAuth,
} from "./components/Authentifcation/AuthProvider";
import Navbar from "./components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import ManageProfiles from "./components/Profiles/ManageProfiles";
import Watch from "./components/Home/Watch";
import MovieListPage from "./components/Home/MovieListPage";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const App: React.FC = () => {
  const location = useLocation();

  // List of paths where the Navbar should not be displayed
  const authPaths = ["/auth", "/login", "/register"];

  return (
    <AuthProvider>
      <div className="App">
        {authPaths.includes(location.pathname) ? null : null}
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/profiles"
            element={
              <PrivateRoute>
                <Profiles />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage"
            element={
              <PrivateRoute>
                <ManageProfiles />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/watch/:movieId"
            element={
              <PrivateRoute>
                <Watch />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/movieListPage"
            element={
              <PrivateRoute>
                <MovieListPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
