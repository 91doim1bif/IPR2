import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import Home from '../components/Home/Home';

// Mocking the hooks
jest.mock('../../hooks/useMovieList', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: [],
    isLoading: false,
  })),
}));

jest.mock('../../hooks/useFavorites', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    favorites: [],
    isLoading: false,
  })),
}));

jest.mock('../../hooks/useCurrentUser', () => ({
  __esModule: true,
  useCurrentUser: jest.fn(() => ({
    user: {
      favoriteIds: [],
    },
  })),
}));

describe('Home Component', () => {
  it('renders loading text while fetching data', () => {
    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders home content when data is loaded', () => {
    render(<Home />);
    expect(screen.getByText('Trending Now')).toBeInTheDocument();
    expect(screen.getByText('My List')).toBeInTheDocument();
  });
});
