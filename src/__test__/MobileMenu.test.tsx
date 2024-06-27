import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MobileMenu from '../components/Navbar/MobileMenu'; // Adjust the path according to your project structure

describe('MobileMenu Component', () => {
  const links = [
    { href: '/', text: 'Home' },
    { href: '/series', text: 'Series' },
    { href: '/films', text: 'Films' },
    { href: '/new', text: 'New & Popular' },
    { href: '/my-list', text: 'My List' },
    { href: '/languages', text: 'Browse by languages' },
  ];

  it('does not render when visible is false', () => {
    render(<MobileMenu visible={false} />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('renders correctly when visible is true', () => {
    render(<MobileMenu visible={true} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    links.forEach(link => {
      expect(screen.getByText(link.text)).toBeInTheDocument();
      expect(screen.getByText(link.text).closest('a')).toHaveAttribute('href', link.href);
    });
  });
});
