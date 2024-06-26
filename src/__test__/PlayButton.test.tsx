import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import PlayButton from '../components/Home/PlayButton';
import '@testing-library/jest-dom';

// Mock movie data
const movieId = '664a6a887d397d87582c27e0';

describe('PlayButton component', () => {
  it('should render the Play button with the correct text and icon', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <PlayButton movieId={movieId} />
      </Router>
    );

    const buttonElement = screen.getByRole('button', { name: /play/i });
    expect(buttonElement).toBeInTheDocument();

    const iconElement = screen.getByTestId('BsFillPlayFill');
    expect(iconElement).toBeInTheDocument();
  });

  it('should navigate to the correct URL when clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <PlayButton movieId={movieId} />
      </Router>
    );

    const buttonElement = screen.getByRole('button', { name: /play/i });
    fireEvent.click(buttonElement);

    expect(history.location.pathname).toBe(`/watch/${movieId}`);
  });

  it('should have the correct initial styles', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <PlayButton movieId={movieId} />
      </Router>
    );

    const buttonElement = screen.getByRole('button', { name: /play/i });

    expect(buttonElement).toHaveClass('bg-white');
    expect(buttonElement).toHaveClass('rounded-md');
    expect(buttonElement).toHaveClass('py-1');
    expect(buttonElement).toHaveClass('md:py-2');
    expect(buttonElement).toHaveClass('px-2');
    expect(buttonElement).toHaveClass('md:px-4');
    expect(buttonElement).toHaveClass('w-auto');
    expect(buttonElement).toHaveClass('text-xs');
    expect(buttonElement).toHaveClass('lg:text-lg');
    expect(buttonElement).toHaveClass('font-semibold');
    expect(buttonElement).toHaveClass('flex');
    expect(buttonElement).toHaveClass('flex-row');
    expect(buttonElement).toHaveClass('items-center');
    expect(buttonElement).toHaveClass('hover:bg-neutral-300');
    expect(buttonElement).toHaveClass('transition');
  });
});
