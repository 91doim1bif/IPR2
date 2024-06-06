import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { InfoModalProvider, useInfoModal } from './useInfoModal';

describe('useInfoModal Hook', () => {
  test('throws error when used outside of InfoModalProvider', () => {
    const { result } = renderHook(() => useInfoModal());

    expect(result.error).toEqual(
      Error('useInfoModal must be used within an InfoModalProvider')
    );
  });

  test('returns correct context value within InfoModalProvider', () => {
    const wrapper: React.FC = ({ children }) => (
      <InfoModalProvider>{children}</InfoModalProvider>
    );

    const { result } = renderHook(() => useInfoModal(), { wrapper });

    expect(result.current.movieId).toBeNull();
    expect(typeof result.current.setMovieId).toBe('function');
  });

  test('updates movieId correctly', () => {
    const wrapper: React.FC = ({ children }) => (
      <InfoModalProvider>{children}</InfoModalProvider>
    );

    const { result } = renderHook(() => useInfoModal(), { wrapper });

    act(() => {
      result.current.setMovieId('123');
    });

    expect(result.current.movieId).toBe('123');
  });
});
