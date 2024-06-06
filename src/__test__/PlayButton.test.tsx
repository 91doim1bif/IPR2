import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import PlayButton from "../components/Home/PlayButton";

describe("PlayButton", () => {
  it("navigates to the correct URL when clicked", () => {
    const history = createMemoryHistory();
    const movieId = "123";

    render(
      <Router history={history}>
        <PlayButton movieId={movieId} />
      </Router>
    );

    const button = screen.getByRole("button", { name: /play/i });
    fireEvent.click(button);

    expect(history.location.pathname).toBe(`/watch/${movieId}`);
  });

  it("renders with correct styles", () => {
    const history = createMemoryHistory();
    const movieId = "123";

    render(
      <Router history={history}>
        <PlayButton movieId={movieId} />
      </Router>
    );

    const button = screen.getByRole("button", { name: /play/i });
    expect(button).toHaveClass(
      "bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition"
    );

    const icon = screen.getByTestId("BsFillPlayFill");
    expect(icon).toBeInTheDocument();
  });
});
