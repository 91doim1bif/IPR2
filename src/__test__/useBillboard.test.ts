import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useBillboard from './useBillboard';

// Mock axios
jest.mock('axios');

describe('useBillboard Hook', () => {
  test('fetches billboard data correctly', async () => {
    const mockData = {
      _id: '1',
      title: 'Test Billboard',
      description: 'Test description',
      videoUrl: 'https://example.com/video',
      thumbnailUrl: 'https://example.com/thumbnail',
      genre: 'Test Genre',
      duration: '1:30',
    };

    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() => useBillboard());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  test('handles fetch error correctly', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch billboard data'));

    const { result, waitForNextUpdate } = renderHook(() => useBillboard());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Failed to fetch billboard data');
  });
});
