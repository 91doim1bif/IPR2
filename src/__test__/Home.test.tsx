import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../components/Home/Home';
import useMovieList from '../hooks/useMovieList';
import useFavorites from '../hooks/useFavorites';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { Movie } from '../types/movie'; // Ensure the path is correct
import { User } from '../types/user'; // Ensure the path is correct

jest.mock('../hooks/useMovieList');
jest.mock('../hooks/useFavorites');
jest.mock('../hooks/useCurrentUser');
jest.mock('../components/Navbar/Navbar', () => () => <div>Navbar</div>);
jest.mock('../components/Home/Billboard', () => () => <div>Billboard</div>);
jest.mock('../components/Home/MovieList', () => ({ title, data }: { title: string; data: Movie[] }) => (
  <div>
    <h2>{title}</h2>
    <div>{data.map((movie: Movie) => <div key={movie.id}>{movie.title}</div>)}</div>
  </div>
));
jest.mock('../components/Home/InfoModal', () => ({ visible, onClose, movieId, setMovieId }: { visible: boolean; onClose: () => void; movieId: string | null; setMovieId: (id: string | null) => void }) => (
  visible ? <div>InfoModal for {movieId}</div> : null
));

describe('Home Component', () => {
  beforeEach(() => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      user: { favoriteIds: ['664a6a887d397d87582c27e0'] },
      loading: false,
      error: null,
      mutate: jest.fn(),
    });

    (useMovieList as jest.Mock).mockReturnValue({
      data: [{
        title: 'Big Buck Bunny',
        description: 'Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.',
        videoUrl: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
        thumbnailUrl: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
        genre: 'Animation',
        duration: '10:34',
        id: '664a6a887d397d87582c27e0',
      }],
      isLoading: false,
      error: null,
    });

    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [{
        title: 'Big Buck Bunny',
        description: 'Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.',
        videoUrl: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
        thumbnailUrl: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
        genre: 'Animation',
        duration: '10:34',
        id: '664a6a887d397d87582c27e0',
      }],
      isLoading: false,
      error: null,
    });
  });

  test('renders loading state', () => {
    (useMovieList as jest.Mock).mockReturnValueOnce({ data: [], isLoading: true, error: null });
    (useFavorites as jest.Mock).mockReturnValueOnce({ favorites: [], isLoading: true, error: null });

    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders movies and favorites', async () => {
    render(<Home />);

    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Billboard')).toBeInTheDocument();
    expect(screen.getByText('Trending Now')).toBeInTheDocument();
    expect(screen.getByText('My List')).toBeInTheDocument();
    expect(screen.getAllByText('Big Buck Bunny').length).toBeGreaterThan(0);
  });

  test('opens and closes InfoModal', async () => {
    render(<Home />);

    const movieList = screen.getAllByText('Big Buck Bunny')[0];
    fireEvent.click(movieList);

    expect(screen.getByText((content, element) => {
      return element?.textContent === 'InfoModal for 664a6a887d397d87582c27e0';
    })).toBeInTheDocument();

    // Assuming the close button has text 'Close'
    // Adjust based on your actual implementation in InfoModal
    const closeModalButton = screen.getByText('Close'); 
    fireEvent.click(closeModalButton);

    await waitFor(() => {
      expect(screen.queryByText((content, element) => {
        return element?.textContent === 'InfoModal for 664a6a887d397d87582c27e0';
      })).not.toBeInTheDocument();
    });
  });
});
