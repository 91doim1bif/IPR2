import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For using jest-dom matchers

import MobileMenu from '../components/Navbar/MobileMenu';

describe('MobileMenu Component', () => {
  test('should render nothing if visible prop is false', () => {
    const { container } = render(<MobileMenu visible={false} />);
    expect(container.firstChild).toBeNull(); // Asserts that the container is empty
  });

  test('should render menu items if visible prop is true', () => {
    const { getByText } = render(<MobileMenu visible={true} />);
    
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Series')).toBeInTheDocument();
    expect(getByText('Films')).toBeInTheDocument();
    expect(getByText('New & Popular')).toBeInTheDocument();
    expect(getByText('My List')).toBeInTheDocument();
    expect(getByText('Browse by languages')).toBeInTheDocument();
  });

  test('should have correct links', () => {
    const { getByText } = render(<MobileMenu visible={true} />);
    
    expect(getByText('Home')).toHaveAttribute('href', '/');
    expect(getByText('Series')).toHaveAttribute('href', '/series');
    expect(getByText('Films')).toHaveAttribute('href', '/films');
    expect(getByText('New & Popular')).toHaveAttribute('href', '/new');
    expect(getByText('My List')).toHaveAttribute('href', '/my-list');
    expect(getByText('Browse by languages')).toHaveAttribute('href', '/languages');
  });
});
