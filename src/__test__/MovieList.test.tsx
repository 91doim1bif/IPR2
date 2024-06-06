import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import MovieList from "../components/Home/MovieList";
import { Movie } from "../types/movie";

// Mock für die MovieCard-Komponente
jest.mock("./MovieCard", () => ({
  __esModule: true,
  default: ({ data, onInfoClick }: { data: Movie, onInfoClick: (id: string) => void }) => (
    <div data-testid="movie-card">
      <button onClick={() => onInfoClick(data.id)}>Info</button>
      <p>{data.title}</p>
    </div>
  ),
}));

// Mock für die InfoModal-Komponente
jest.mock("./InfoModal", () => ({
  __esModule: true,
  default: ({ visible, onClose, movieId }: { visible: boolean, onClose: () => void, movieId: string }) => (
    visible ? <div data-testid="info-modal"><button onClick={onClose}>Close</button></div> : null
  ),
}));

describe("MovieList", () => {
  const mockMovies: Movie[] = [
    { id: "1", title: "Movie 1", thumbnailUrl: "", videoUrl: "", description: "", genre: "", duration: "" },
    { id: "2", title: "Movie 2", thumbnailUrl: "", videoUrl: "", description: "", genre: "", duration: "" },
  ];

  it("renders the movie list with title", () => {
    render(<MovieList data={mockMovies} title="Test Title" />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getAllByTestId("movie-card")).toHaveLength(2);
  });

  it("shows 'No movies found' when data is empty", () => {
    render(<MovieList data={[]} title="Empty List" />);

    expect(screen.getByText("Empty List")).toBeInTheDocument();
    expect(screen.getByText("No movies found")).toBeInTheDocument();
  });

  it("opens and closes the InfoModal when movie info is clicked", () => {
    render(<MovieList data={mockMovies} title="Test Title" />);

    fireEvent.click(screen.getAllByText("Info")[0]);
    expect(screen.getByTestId("info-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("info-modal")).not.toBeInTheDocument();
  });
});
