import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useCurrentUser from './useCurrentUser';

// Mock axios
jest.mock('axios');

describe('useCurrentUser Hook', () => {
  test('fetches current user data correctly', async () => {
    const mockUser = {
      _id: '1',
      name: 'Test User',
      email: 'test@example.com',
      image: 'test.jpg',
      emailVerified: new Date(),
      favoriteIds: ['1', '2', '3'],
    };

    axios.get.mockResolvedValueOnce({ data: mockUser });

    const { result, waitForNextUpdate } = renderHook(() => useCurrentUser());

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });

  test('handles fetch error correctly', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch current user'));

    const { result, waitForNextUpdate } = renderHook(() => useCurrentUser());

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe('Failed to fetch current user');
  });

  test('mutate updates current user correctly', async () => {
    const mockUser = {
      _id: '1',
      name: 'Updated User',
      email: 'updated@example.com',
      image: 'updated.jpg',
      emailVerified: new Date(),
      favoriteIds: ['1', '2', '3'],
    };

    axios.get.mockResolvedValueOnce({ data: mockUser });

    const { result } = renderHook(() => useCurrentUser());

    await result.current.mutate();

    expect(result.current.loading).toBe(false);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });
});
