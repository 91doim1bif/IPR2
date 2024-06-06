import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import axios from "axios";
import MovieListPage from "./MovieListPage"; // Passe den Pfad an deine Projektstruktur an

// Mock für axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("MovieListPage", () => {
  const mockMovies = [
    { id: "1", title: "Movie 1", thumbnailUrl: "", videoUrl: "", description: "", genre: "", duration: "" },
    { id: "2", title: "Movie 2", thumbnailUrl: "", videoUrl: "", description: "", genre: "", duration: "" },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockMovies });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the MovieListPage and fetches movies", async () => {
    render(<MovieListPage />);

    expect(screen.getByText("Movies")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText(/Movie \d/)).toHaveLength(2);
    });
  });

  it("allows adding a new movie", async () => {
    mockedAxios.post.mockResolvedValue({ data: { id: "3", ...mockMovies[0] } });
    
    render(<MovieListPage />);

    const titleInput = screen.getByPlaceholderText("Title");
    const descriptionInput = screen.getByPlaceholderText("Description");
    const videoUrlInput = screen.getByPlaceholderText("Video URL");
    const thumbnailUrlInput = screen.getByPlaceholderText("Thumbnail URL");
    const genreInput = screen.getByPlaceholderText("Genre");
    const durationInput = screen.getByPlaceholderText("Duration");
    const addButton = screen.getByText("Add Movie");

    fireEvent.change(titleInput, { target: { value: "New Movie" } });
    fireEvent.change(descriptionInput, { target: { value: "New Description" } });
    fireEvent.change(videoUrlInput, { target: { value: "New Video URL" } });
    fireEvent.change(thumbnailUrlInput, { target: { value: "New Thumbnail URL" } });
    fireEvent.change(genreInput, { target: { value: "New Genre" } });
    fireEvent.change(durationInput, { target: { value: "New Duration" } });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:5000/api/movies", {
        title: "New Movie",
        description: "New Description",
        videoUrl: "New Video URL",
        thumbnailUrl: "New Thumbnail URL",
        genre: "New Genre",
        duration: "New Duration",
      });
    });

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(2); // Einmal initial und einmal nach dem Hinzufügen
    });
  });

  it("handles fetch movies error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch movies"));

    render(<MovieListPage />);

    await waitFor(() => {
      expect(screen.queryByText(/Movie \d/)).toBeNull();
    });
  });

  it("handles add movie error", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Failed to add movie"));

    render(<MovieListPage />);

    const addButton = screen.getByText("Add Movie");
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1); // Nur einmal initial, kein zweiter Aufruf nach Fehler
    });
  });
});
