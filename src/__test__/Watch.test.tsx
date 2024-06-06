import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import Watch from "../components/Home/Watch";
import useMovie from "../hooks/useMovie";

// Mock for useParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

// Mock for useMovie
jest.mock("../../hooks/useMovie");

describe("Watch Component", () => {
  const mockUseNavigate = jest.fn();

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ movieId: "1" });
    (useNavigate as jest.Mock).mockReturnValue(mockUseNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useMovie as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/watch/1"]}>
        <Routes>
          <Route path="/watch/:movieId" element={<Watch />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useMovie as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(
      <MemoryRouter initialEntries={["/watch/1"]}>
        <Routes>
          <Route path="/watch/:movieId" element={<Watch />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Error loading movie")).toBeInTheDocument();
  });

  it("renders movie video player for YouTube link", () => {
    (useMovie as jest.Mock).mockReturnValue({
      data: {
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/watch/1"]}>
        <Routes>
          <Route path="/watch/:movieId" element={<Watch />} />
        </Routes>
      </MemoryRouter>
    );

    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  });

  it("renders movie video player for non-YouTube link", () => {
    (useMovie as jest.Mock).mockReturnValue({
      data: {
        videoUrl: "https://example.com/movie.mp4",
      },
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/watch/1"]}>
        <Routes>
          <Route path="/watch/:movieId" element={<Watch />} />
        </Routes>
      </MemoryRouter>
    );

    const video = screen.getByRole("video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("src", "https://example.com/movie.mp4");
  });

  it("navigates back when back button is clicked", () => {
    (useMovie as jest.Mock).mockReturnValue({
      data: {
        videoUrl: "https://example.com/movie.mp4",
      },
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/watch/1"]}>
        <Routes>
          <Route path="/watch/:movieId" element={<Watch />} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button");
    fireEvent.click(backButton);
    expect(mockUseNavigate).toHaveBeenCalledWith(-1);
  });
});
