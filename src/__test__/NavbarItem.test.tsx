import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For using jest-dom matchers

import NavbarItem from '../components/Navbar/NavbarItem';

describe('NavbarItem Component', () => {
  test('should render without crashing', () => {
    const mockOnClick = jest.fn(); // Create a mock function for onClick
    render(<NavbarItem label="Test Label" onClick={mockOnClick} />);
  });

  test('should render correct label', () => {
    const mockOnClick = jest.fn(); // Create a mock function for onClick
    const { getByText } = render(<NavbarItem label="Test Label" onClick={mockOnClick} />);
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  test('should call onClick when clicked', () => {
    const mockOnClick = jest.fn(); // Create a mock function for onClick
    const { getByText } = render(<NavbarItem label="Test Label" onClick={mockOnClick} />);
    
    fireEvent.click(getByText('Test Label'));
    
    expect(mockOnClick).toHaveBeenCalledTimes(1); // Check if onClick is called once
  });
});
