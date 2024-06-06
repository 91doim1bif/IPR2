import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useMovie from './useMovie';

// Mock axios
jest.mock('axios');

describe('useMovie Hook', () => {
  test('fetches movie data correctly', async () => {
    const mockMovieId = '123';
    const mockMovieData = {
      id: '123',
      title: 'Test Movie',
      description: 'This is a test movie',
      videoUrl: 'https://example.com/movie.mp4',
      thumbnailUrl: 'https://example.com/movie.jpg',
      genre: 'Action',
      duration: '2h 30min',
    };

    axios.get.mockResolvedValueOnce({ data: mockMovieData });

    const { result, waitForNextUpdate } = renderHook(() => useMovie(mockMovieId));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockMovieData);
    expect(result.current.error).toBeNull();
  });

  test('handles fetch error correctly', async () => {
    const mockMovieId = '123';

    axios.get.mockRejectedValueOnce(new Error('Failed to fetch movie'));

    const { result, waitForNextUpdate } = renderHook(() => useMovie(mockMovieId));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Failed to fetch movie');
  });

  test('does not fetch movie data when movieId is null', () => {
    const { result } = renderHook(() => useMovie(null));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
