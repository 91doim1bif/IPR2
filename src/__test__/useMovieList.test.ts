import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useMovieList from './useMovieList';

// Mock axios
jest.mock('axios');

describe('useMovieList Hook', () => {
  test('fetches movie list correctly', async () => {
    const mockMovies = [
      { id: '1', title: 'Movie 1' },
      { id: '2', title: 'Movie 2' },
      { id: '3', title: 'Movie 3' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockMovies });

    const { result, waitForNextUpdate } = renderHook(() => useMovieList());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockMovies);
    expect(result.current.error).toBeNull();
  });

  test('handles fetch error correctly', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch movies'));

    const { result, waitForNextUpdate } = renderHook(() => useMovieList());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch movies');
  });
});
