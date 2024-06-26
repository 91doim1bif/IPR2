import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import MovieList from "../components/Home/MovieList";
import { Movie } from "../types/movie";

// Mock data for testing
const mockMovies: Movie[] = [
  {
    id: "664a6a887d397d87582c27e0",
    title: "Big Buck Bunny",
    description: "Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.",
    videoUrl: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4",
    thumbnailUrl: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
    genre: "Animation",
    duration: "10:34"
  }
];

// Mock components
jest.mock("../components/Home/MovieCard", () => ({ data, onInfoClick }: any) => (
  <div data-testid="movie-card" onClick={() => onInfoClick(data.id)}>
    {data.title}
  </div>
));

jest.mock("../components/Home/InfoModal", () => ({ visible, onClose, movieId, setMovieId }: any) => (
  visible ? (
    <div data-testid="info-modal">
      <button data-testid="close-modal" onClick={onClose}>Close</button>
      <p>Movie ID: {movieId}</p>
    </div>
  ) : null
));

describe("MovieList Component", () => {
  it("renders the title", () => {
    render(<MovieList data={mockMovies} title="Test Movies" />);
    expect(screen.getByText("Test Movies")).toBeInTheDocument();
  });

  it("displays 'No movies found' when there is no data", () => {
    render(<MovieList data={[]} title="Test Movies" />);
    expect(screen.getByText("No movies found")).toBeInTheDocument();
  });

  it("renders a list of movies", () => {
    render(<MovieList data={mockMovies} title="Test Movies" />);
    const movieCards = screen.getAllByTestId("movie-card");
    expect(movieCards.length).toBe(1);
    expect(movieCards[0]).toHaveTextContent("Big Buck Bunny");
  });

  it("opens and closes the InfoModal when a movie is clicked", () => {
    render(<MovieList data={mockMovies} title="Test Movies" />);

    // Click on the movie card to open the modal
    fireEvent.click(screen.getByText("Big Buck Bunny"));
    expect(screen.getByTestId("info-modal")).toBeInTheDocument();
    expect(screen.getByText("Movie ID: 664a6a887d397d87582c27e0")).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByTestId("close-modal"));
    expect(screen.queryByTestId("info-modal")).not.toBeInTheDocument();
  });
});
