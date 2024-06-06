import { render, screen, waitFor } from '@testing-library/react';
import Billboard from '../components/Home/Billboard';

jest.mock('../../hooks/useBillboard', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: {
      _id: '123',
      title: 'Test Movie',
      description: 'This is a test movie',
      videoUrl: 'test.mp4',
      thumbnailUrl: 'test.jpg',
    },
    isLoading: false,
    error: null,
  })),
}));

describe('Billboard component', () => {
  it('renders video title and description', async () => {
    render(<Billboard />);
    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      expect(screen.getByText('This is a test movie')).toBeInTheDocument();
    });
  });

  it('renders loading text while fetching data', async () => {
    jest.mock('../../hooks/useBillboard', () => ({
      __esModule: true,
      default: jest.fn(() => ({
        data: null,
        isLoading: true,
        error: null,
      })),
    }));
    render(<Billboard />);
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('renders error message if data fetching fails', async () => {
    jest.mock('../../hooks/useBillboard', () => ({
      __esModule: true,
      default: jest.fn(() => ({
        data: null,
        isLoading: false,
        error: 'Failed to fetch billboard data',
      })),
    }));
    render(<Billboard />);
    await waitFor(() => {
      expect(screen.getByText('Error loading billboard data')).toBeInTheDocument();
    });
  });
});
