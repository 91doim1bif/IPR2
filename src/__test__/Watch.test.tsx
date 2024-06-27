// Watch.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Watch from '../components/Home/Watch';
import useMovie from '../hooks/useMovie';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mock the useMovie hook
jest.mock('../hooks/useMovie');
const mockedUseMovie = useMovie as jest.MockedFunction<typeof useMovie>;

// Mock the useNavigate hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Watch Component', () => {
  const renderComponent = (movieId: string) => {
    render(
      <MemoryRouter initialEntries={[`/watch/${movieId}`]}>
        <Routes>
          <Route path="/watch/:movieId" element={<Watch />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('should display loading state initially', () => {
    mockedUseMovie.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderComponent('664a6a887d397d87582c27e0');

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('should display error state if there is an error', () => {
    mockedUseMovie.mockReturnValue({
      data: null,
      isLoading: false,
      error: 'Error loading movie',
    });

    renderComponent('664a6a887d397d87582c27e0');

    expect(screen.getByText(/error loading movie/i)).toBeInTheDocument();
  });

  it('should display the video if the data is successfully fetched and the URL is not YouTube', async () => {
    mockedUseMovie.mockReturnValue({
      data: {
        _id: '664a6a887d397d87582c27e0',
        title: 'Big Buck Bunny',
        description: 'Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.',
        videoUrl: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
        thumbnailUrl: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
        genre: 'Animation',
        duration: '10:34',
      },
      isLoading: false,
      error: null,
    });

    renderComponent('664a6a887d397d87582c27e0');

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByTestId('video-element')).toHaveAttribute('src', 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4');
    });
  });

  it('should display the YouTube video if the URL is a YouTube link', async () => {
    mockedUseMovie.mockReturnValue({
      data: {
        _id: '664a6a887d397d87582c27e0',
        title: 'Big Buck Bunny',
        description: 'Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.',
        videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        thumbnailUrl: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
        genre: 'Animation',
        duration: '10:34',
      },
      isLoading: false,
      error: null,
    });

    renderComponent('664a6a887d397d87582c27e0');

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByTitle('YouTube video player')).toBeInTheDocument();
    });
  });

  it('should navigate back when the back button is clicked', async () => {
    mockedUseMovie.mockReturnValue({
      data: {
        _id: '664a6a887d397d87582c27e0',
        title: 'Big Buck Bunny',
        description: 'Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.',
        videoUrl: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
        thumbnailUrl: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
        genre: 'Animation',
        duration: '10:34',
      },
      isLoading: false,
      error: null,
    });

    renderComponent('664a6a887d397d87582c27e0');

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole('button'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
