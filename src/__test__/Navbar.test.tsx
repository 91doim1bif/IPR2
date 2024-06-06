import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For using jest-dom matchers
import { BrowserRouter } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';

describe('Navbar Component', () => {
  test('should render without crashing', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  test('should toggle mobile menu when clicked', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const browseButton = getByText('Browse');

    fireEvent.click(browseButton);

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Series')).toBeInTheDocument();
    expect(getByText('Films')).toBeInTheDocument();
    expect(getByText('New & Popular')).toBeInTheDocument();
    expect(getByText('My List')).toBeInTheDocument();
    expect(getByText('Browse by languages')).toBeInTheDocument();

    fireEvent.click(browseButton);

    expect(() => getByText('Home')).toThrow();
    expect(() => getByText('Series')).toThrow();
    expect(() => getByText('Films')).toThrow();
    expect(() => getByText('New & Popular')).toThrow();
    expect(() => getByText('My List')).toThrow();
    expect(() => getByText('Browse by languages')).toThrow();
  });

  // Add more tests as needed
});
