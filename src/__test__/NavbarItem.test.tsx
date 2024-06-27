import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavbarItem from '../components/Navbar/NavbarItem'; // Adjust the path according to your project structure

describe('NavbarItem Component', () => {
  const mockOnClick = jest.fn();
  const label = 'Home';

  beforeEach(() => {
    render(<NavbarItem label={label} onClick={mockOnClick} />);
  });

  it('renders with the correct label', () => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    fireEvent.click(screen.getByText(label));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('has the correct classes', () => {
    const navbarItem = screen.getByText(label);
    expect(navbarItem).toHaveClass('text-white cursor-pointer hover:text-gray-300 transition');
  });
});
