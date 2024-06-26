import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InfoModal from "../components/Home/InfoModal";
import useMovie from "../hooks/useMovie";
import { AiOutlineClose } from "react-icons/ai";

// Mocking hooks and components
jest.mock("../hooks/useMovie");
jest.mock("../components/Home/PlayButton", () => () => <div data-testid="PlayButton">Play Button</div>);
jest.mock("../components/Home//FavoriteButton", () => () => <div data-testid="FavoriteButton">Favorite Button</div>);

describe("InfoModal", () => {
  const setMovieId = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const movieData = {
    id: "664a6a887d397d87582c27e0",
    title: "Big Buck Bunny",
    description: "Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.",
    videoUrl: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4",
    thumbnailUrl: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
    genre: "Animation",
    duration: "10:34",
  };

  test("renders correctly when visible and movie data is loading", () => {
    (useMovie as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<InfoModal visible={true} onClose={onClose} movieId="664a6a887d397d87582c27e0" setMovieId={setMovieId} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders correctly when there is an error", () => {
    (useMovie as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: "Error loading movie information",
    });

    render(<InfoModal visible={true} onClose={onClose} movieId="664a6a887d397d87582c27e0" setMovieId={setMovieId} />);
    expect(screen.getByText("Error loading movie information")).toBeInTheDocument();
  });

  test("renders correctly when movie data is available", async () => {
    (useMovie as jest.Mock).mockReturnValue({
      data: movieData,
      isLoading: false,
      error: null,
    });

    render(<InfoModal visible={true} onClose={onClose} movieId="664a6a887d397d87582c27e0" setMovieId={setMovieId} />);
    expect(screen.getByText(movieData.title)).toBeInTheDocument();
    expect(screen.getByText(movieData.duration)).toBeInTheDocument();
    expect(screen.getByText(movieData.genre)).toBeInTheDocument();
    expect(screen.getByText(movieData.description)).toBeInTheDocument();
    expect(screen.getByTestId("PlayButton")).toBeInTheDocument();
    expect(screen.getByTestId("FavoriteButton")).toBeInTheDocument();
  });

  test("handles close action", async () => {
    (useMovie as jest.Mock).mockReturnValue({
      data: movieData,
      isLoading: false,
      error: null,
    });

    render(<InfoModal visible={true} onClose={onClose} movieId="664a6a887d397d87582c27e0" setMovieId={setMovieId} />);
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(setMovieId).toHaveBeenCalledWith(null);
    });
  });
});
