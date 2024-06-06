import { renderHook } from '@testing-library/react';
import axios from 'axios';
import useMovie from '../hooks/useMovie';

// Mock axios
jest.mock('axios');

describe('useMovie Hook', () => {
  test('fetches movie data correctly', async () => {
    const mockMovieId = '664a6a887d397d87582c27e0';
    const mockMovieData = {
      title: 'Big Buck Bunny',
      description: 'Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.',
      videoUrl: '[Big Buck Bunny Video](http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4)',
      thumbnailUrl: '[Big Buck Bunny Thumbnail](https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217)',
      genre: 'Animation',
      duration: '10:34',
      id: '664a6a887d397d87582c27e0'
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
    const mockMovieId = '664a6a887d397d87582c27e0';

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
