// NavbarItem.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavbarItem from '../components/Navbar/NavbarItem';

describe('NavbarItem Component', () => {
  test('renders the label', () => {
    const label = 'Home';
    render(<NavbarItem label={label} onClick={() => {}} />);

    // Check if the label is rendered
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const label = 'Home';
    const onClickMock = jest.fn();
    render(<NavbarItem label={label} onClick={onClickMock} />);

    // Simulate a click event
    fireEvent.click(screen.getByText(label));

    // Check if onClick was called once
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('applies correct styles on hover', () => {
    const label = 'Home';
    render(<NavbarItem label={label} onClick={() => {}} />);

    const navbarItem = screen.getByText(label);

    // Simulate hover state
    fireEvent.mouseOver(navbarItem);

    // Check if hover styles are applied
    expect(navbarItem).toHaveClass('hover:text-gray-300');
  });
});
