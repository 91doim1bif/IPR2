import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InfoModal from '../components/Home/InfoModal';

describe('InfoModal', () => {
  const onClose = jest.fn();
  const setMovieId = jest.fn();

  const mockMovie = {
    id: '1',
    title: 'Test Movie',
    description: 'This is a test movie',
    videoUrl: 'https://example.com/test.mp4',
    thumbnailUrl: 'https://example.com/test.jpg',
    genre: 'Action',
    duration: '1h 30min',
  };

  test('renders movie information', () => {
    render(
      <InfoModal visible movieId={mockMovie.id} onClose={onClose} setMovieId={setMovieId} />
    );

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genre)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.duration)).toBeInTheDocument();
  });

  test('calls onClose and setMovieId when close button is clicked', () => {
    render(
      <InfoModal visible movieId={mockMovie.id} onClose={onClose} setMovieId={setMovieId} />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
    expect(setMovieId).toHaveBeenCalledWith(null);
  });

  // Add more tests as needed
});
