// components/Home/__tests__/FavoriteButton.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import FavoriteButton from '../FavoriteButton';
import useFavorites from '../../../hooks/useFavorites';

// Mock axios module
jest.mock('axios');

// Mock useFavorites hook
jest.mock('../../../hooks/useFavorites', () => jest.fn());

describe('FavoriteButton component', () => {
  it('renders without crashing', () => {
    // Mock useFavorites hook return value
    (useFavorites as jest.Mock).mockReturnValue({ favorites: [], isLoading: false, fetchFavorites: jest.fn() });

    render(<FavoriteButton movieId="1" />);
  });

  it('toggles favorite status on click', async () => {
    // Mock useFavorites hook return value
    (useFavorites as jest.Mock).mockReturnValue({ favorites: [], isLoading: false, fetchFavorites: jest.fn() });

    // Mock axios.post implementation for adding favorite
    (axios.post as jest.Mock).mockResolvedValueOnce({ status: 200 });

    const { getByRole } = render(<FavoriteButton movieId="1" />);

    fireEvent.click(getByRole('button'));

    // Wait for the async toggleFavorite function to finish
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1); // Ensure axios.post is called
      expect(axios.post).toHaveBeenCalledWith('/api/favorite', { movieId: '1' }); // Ensure axios.post is called with the correct movieId
    });
  });

  it('fetches favorites after toggling', async () => {
    // Mock useFavorites hook return value
    (useFavorites as jest.Mock).mockReturnValue({ favorites: [], isLoading: false, fetchFavorites: jest.fn() });

    // Mock axios.post implementation for adding favorite
    (axios.post as jest.Mock).mockResolvedValueOnce({ status: 200 });

    const { getByRole } = render(<FavoriteButton movieId="1" />);

    fireEvent.click(getByRole('button'));

    // Wait for the async toggleFavorite function to finish
    await waitFor(() => {
      expect(useFavorites().fetchFavorites).toHaveBeenCalledTimes(1); // Ensure fetchFavorites is called after toggling
    });
  });

  // Add more test cases as needed
});
