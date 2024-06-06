import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieCard from "./MovieCard";

describe("MovieCard component", () => {
  const mockData = {
    id: "1",
    title: "Test Movie",
    thumbnailUrl: "test.jpg",
    duration: "1h 30m",
    genre: "Action",
  };

  test("renders movie card correctly", () => {
    render(<MovieCard data={mockData} onInfoClick={() => {}} />);

    // Check if the movie title is rendered
    const movieTitle = screen.getByText(mockData.title);
    expect(movieTitle).toBeInTheDocument();

    // Check if the play button is rendered
    const playButton = screen.getByRole("button", { name: /play/i });
    expect(playButton).toBeInTheDocument();

    // Check if the favorite button is rendered
    const favoriteButton = screen.getByRole("button", { name: /favorite/i });
    expect(favoriteButton).toBeInTheDocument();
  });

  test("clicking on play button navigates to watch page", () => {
    const mockOnInfoClick = jest.fn();
    render(<MovieCard data={mockData} onInfoClick={mockOnInfoClick} />);

    // Click on the play button
    const playButton = screen.getByRole("button", { name: /play/i });
    userEvent.click(playButton);

    // Check if the onInfoClick function is called with the correct movie ID
    expect(mockOnInfoClick).toHaveBeenCalledWith(mockData.id);
  });

  test("clicking on favorite button toggles favorite status", () => {
    render(<MovieCard data={mockData} onInfoClick={() => {}} />);

    // Click on the favorite button
    const favoriteButton = screen.getByRole("button", { name: /favorite/i });
    userEvent.click(favoriteButton);

    // Check if the favorite button toggles
    expect(favoriteButton).toHaveAttribute("aria-pressed", "true");

    // Click on the favorite button again
    userEvent.click(favoriteButton);

    // Check if the favorite button toggles back
    expect(favoriteButton).toHaveAttribute("aria-pressed", "false");
  });
});
