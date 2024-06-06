import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LikeButton from '../components/Home/LikeButton';

jest.mock('axios');

describe('LikeButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders like button', () => {
    const { getByText } = render(<LikeButton movieId="123" />);
    const likeButton = getByText(/like/i);
    expect(likeButton).toBeInTheDocument();
  });

  test('clicking like button toggles like status', async () => {
    axios.get.mockResolvedValue({ data: { liked: false } });
    axios.post.mockResolvedValue({ status: 200 });

    const { getByText } = render(<LikeButton movieId="123" />);
    const likeButton = getByText(/like/i);
    
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });

  test('handles like status retrieval failure', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch like status'));

    const { getByText } = render(<LikeButton movieId="123" />);
    const likeButton = getByText(/like/i);
    
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

  test('handles like status toggle failure', async () => {
    axios.get.mockResolvedValue({ data: { liked: false } });
    axios.post.mockRejectedValue(new Error('Failed to toggle like status'));

    const { getByText } = render(<LikeButton movieId="123" />);
    const likeButton = getByText(/like/i);
    
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });
});
