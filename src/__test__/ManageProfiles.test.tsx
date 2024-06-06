import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For using jest-dom matchers
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import ManageProfiles from '../components/Profiles/ManageProfiles';

// Mock axios
jest.mock('axios');

describe('ManageProfiles Component', () => {
  test('should render without crashing', () => {
    render(
      <BrowserRouter>
        <ManageProfiles />
      </BrowserRouter>
    );
  });

  test('should render profile cards', async () => {
    const mockProfiles = [
      { _id: '1', name: 'Profile 1', image: 'profile1.jpg' },
      { _id: '2', name: 'Profile 2', image: 'profile2.jpg' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockProfiles });

    const { getByAltText, getByText } = render(
      <BrowserRouter>
        <ManageProfiles />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getByAltText('Profile 1')).toBeInTheDocument();
      expect(getByAltText('Profile 2')).toBeInTheDocument();
      expect(getByText('Profile 1')).toBeInTheDocument();
      expect(getByText('Profile 2')).toBeInTheDocument();
    });
  });

  test('should call deleteProfile when delete button is clicked', async () => {
    const mockProfiles = [
      { _id: '1', name: 'Profile 1', image: 'profile1.jpg' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockProfiles });
    axios.delete.mockResolvedValueOnce({});

    const { getByText } = render(
      <BrowserRouter>
        <ManageProfiles />
      </BrowserRouter>
    );

    const deleteButton = getByText('Delete Profile');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:5000/api/profiles/1', {
        headers: {
          Authorization: 'Bearer null', // Ensure that token is passed correctly
        },
      });
    });
  });

  test('should navigate to /profiles when back button is clicked', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ManageProfiles />
      </BrowserRouter>
    );

    const backButton = getByText('Back to Profiles');
    fireEvent.click(backButton);

    expect(window.location.pathname).toBe('/profiles');
  });
});
