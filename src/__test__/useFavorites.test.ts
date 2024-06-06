import { renderHook } from '@testing-library/react';
import axios from 'axios';
import useFavorites from '../hooks/useFavorites';

// Mock axios
jest.mock('axios');

describe('useFavorites Hook', () => {
  test('fetches favorite movies correctly', async () => {
    const mockFavoriteIds = ['1', '2', '3'];
    const mockMovies = [
      { id: '1', title: 'Movie 1' },
      { id: '2', title: 'Movie 2' },
      { id: '3', title: 'Movie 3' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockMovies });

    const { result, waitForNextUpdate } = renderHook(() => useFavorites(mockFavoriteIds));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.favorites).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.favorites).toEqual(mockMovies);
    expect(result.current.error).toBeNull();
  });

  test('handles fetch error correctly', async () => {
    const mockFavoriteIds = ['1', '2', '3'];

    axios.get.mockRejectedValueOnce(new Error('Failed to fetch favorites'));

    const { result, waitForNextUpdate } = renderHook(() => useFavorites(mockFavoriteIds));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.favorites).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.favorites).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch favorites');
  });

  test('clears favorites when favoriteIds is empty', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFavorites([]));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.favorites).toEqual([]);
    expect(result.current.error).toBeNull();

    // Ensure useEffect is not called again
    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.favorites).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
