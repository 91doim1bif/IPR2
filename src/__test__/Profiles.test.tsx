import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For using jest-dom matchers
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import Profiles from './Profiles';

// Mock axios
jest.mock('axios');

describe('Profiles Component', () => {
  test('should render without crashing', () => {
    render(
      <BrowserRouter>
        <Profiles />
      </BrowserRouter>
    );
  });

  test('should render existing profiles', async () => {
    const mockProfiles = [
      { _id: '1', name: 'Profile 1', image: 'profile1.jpg' },
      { _id: '2', name: 'Profile 2', image: 'profile2.jpg' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockProfiles });

    const { getByText } = render(
      <BrowserRouter>
        <Profiles />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getByText('Profile 1')).toBeInTheDocument();
      expect(getByText('Profile 2')).toBeInTheDocument();
    });
  });

  test('should open modal when "Add Profile" is clicked', async () => {
    const { getByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <Profiles />
      </BrowserRouter>
    );

    const addProfileButton = getByText('Add Profile');
    fireEvent.click(addProfileButton);

    await waitFor(() => {
      expect(getByPlaceholderText('Name')).toBeInTheDocument();
    });
  });

  test('should add new profile when "Weiter" is clicked', async () => {
    const { getByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <Profiles />
      </BrowserRouter>
    );

    const addProfileButton = getByText('Add Profile');
    fireEvent.click(addProfileButton);

    const nameInput = getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'New Profile' } });

    const weiterButton = getByText('Weiter');
    fireEvent.click(weiterButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/profiles',
        { name: 'New Profile', image: 'images/default-blue.jpg', isChild: false },
        { headers: { Authorization: 'Bearer null' } } // Ensure that token is passed correctly
      );
    });
  });

  test('should close modal when "Abbrechen" is clicked', async () => {
    const { getByText, queryByPlaceholderText } = render(
      <BrowserRouter>
        <Profiles />
      </BrowserRouter>
    );

    const addProfileButton = getByText('Add Profile');
    fireEvent.click(addProfileButton);

    const cancelButton = getByText('Abbrechen');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(queryByPlaceholderText('Name')).toBeNull();
    });
  });
});
