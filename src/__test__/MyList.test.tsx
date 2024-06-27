// MyList.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import MyList from "../components/Home/MyList";
import useMovieList from "../hooks/useMovieList";
import useFavorites from "../hooks/useFavorites";
import { useCurrentUser } from "../hooks/useCurrentUser";

// Mock hooks
jest.mock("../hooks/useMovieList");
jest.mock("../hooks/useFavorites");
jest.mock("../hooks/useCurrentUser");

// Mock components
jest.mock("../components/Home/InfoModal", () => ({ visible, onClose, movieId, setMovieId }: any) => (
  visible ? (
    <div data-testid="info-modal">
      <button data-testid="close-modal" onClick={onClose}>Close</button>
      <p>Movie ID: {movieId}</p>
    </div>
  ) : null
));

jest.mock("../components/Navbar/Navbar", () => () => <nav>Navbar</nav>);

jest.mock("../components/Home/MovieList", () => ({ data, title, onInfoClick, history }: any) => (
  <div data-testid="movie-list">
    {data.length === 0 ? "No movies found" : data.map((movie: any) => (
      <div key={movie._id} data-testid="movie-card" onClick={() => onInfoClick(movie._id)}>
        {movie.title}
      </div>
    ))}
  </div>
));

describe("MyList Component", () => {
  const mockFavorites = [
    {
      _id: "664a6a887d397d87582c27e0",
      title: "Big Buck Bunny",
      description: "Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.",
      videoUrl: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4",
      thumbnailUrl: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
      genre: "Animation",
      duration: "10:34"
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    (useMovieList as jest.Mock).mockReturnValue({ data: [], isLoading: true });
    (useFavorites as jest.Mock).mockReturnValue({ favorites: [], isLoading: true, fetchFavorites: jest.fn() });
    (useCurrentUser as jest.Mock).mockReturnValue({ user: null, loading: true, error: null });

    render(<MyList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders movies and opens/closes InfoModal", async () => {
    (useMovieList as jest.Mock).mockReturnValue({ data: [], isLoading: false });
    (useFavorites as jest.Mock).mockReturnValue({ favorites: mockFavorites, isLoading: false, fetchFavorites: jest.fn() });
    (useCurrentUser as jest.Mock).mockReturnValue({ user: { name: "Test User", email: "user@net-movies.de" }, loading: false, error: null });

    render(<MyList />);

    expect(screen.getByTestId("movie-list")).toBeInTheDocument();
    expect(screen.getByText("Big Buck Bunny")).toBeInTheDocument();

    // Open modal
    fireEvent.click(screen.getByText("Big Buck Bunny"));
    expect(screen.getByTestId("info-modal")).toBeInTheDocument();
    expect(screen.getByText("Movie ID: 664a6a887d397d87582c27e0")).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getByTestId("close-modal"));
    await waitFor(() => {
      expect(screen.queryByTestId("info-modal")).not.toBeInTheDocument();
    });
  });

  test("renders no movies message when favorites are empty", () => {
    (useMovieList as jest.Mock).mockReturnValue({ data: [], isLoading: false });
    (useFavorites as jest.Mock).mockReturnValue({ favorites: [], isLoading: false, fetchFavorites: jest.fn() });
    (useCurrentUser as jest.Mock).mockReturnValue({ user: { name: "Test User", email: "user@net-movies.de" }, loading: false, error: null });

    render(<MyList />);

    expect(screen.getByText("No movies found")).toBeInTheDocument();
  });
});
