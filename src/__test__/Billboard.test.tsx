// Billboard.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Billboard from '../components/Home/Billboard';
import useBillboard from '../hooks/useBillboard';

jest.mock('../hooks/useBillboard');
jest.mock('../components/Home/PlayButton', () => () => (
  <button data-testid="play-button">Play</button>
));

describe('Billboard Component', () => {
  const mockUseBillboard = useBillboard as jest.MockedFunction<typeof useBillboard>;

  beforeEach(() => {
    mockUseBillboard.mockClear();
  });

  test('renders loading state', () => {
    mockUseBillboard.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<Billboard onInfoClick={jest.fn()} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    mockUseBillboard.mockReturnValue({
      data: null,
      isLoading: false,
      error: 'Failed to fetch billboard data',
    });

    render(<Billboard onInfoClick={jest.fn()} />);

    expect(screen.getByText('Error loading billboard data')).toBeInTheDocument();
  });

  test('renders billboard data', async () => {
    const mockData = {
      _id: '1',
      title: 'Big Buck Bunny',
      description: 'Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.',
      videoUrl: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
      thumbnailUrl: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
      genre: 'Animation',
      duration: '10:34',
    };

    mockUseBillboard.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(<Billboard onInfoClick={jest.fn()} />);

    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText(mockData.description)).toBeInTheDocument();
    expect(screen.getByTestId('play-button')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(mockData.title)).toBeInTheDocument());
  });

  test('handles More Info button click', () => {
    const mockData = {
      _id: '1',
      title: 'Big Buck Bunny',
      description: 'Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.',
      videoUrl: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
      thumbnailUrl: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
      genre: 'Animation',
      duration: '10:34',
    };

    const handleInfoClick = jest.fn();

    mockUseBillboard.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(<Billboard onInfoClick={handleInfoClick} />);

    const infoButton = screen.getByText('More Info');
    fireEvent.click(infoButton);

    expect(handleInfoClick).toHaveBeenCalledWith(mockData._id);
  });
});
