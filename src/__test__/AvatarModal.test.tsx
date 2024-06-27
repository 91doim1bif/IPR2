import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AvatarModal from '../components/Profiles/AvatarModal'; // Adjust the path according to your project structure

describe('AvatarModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSelectAvatar = jest.fn();
  const avatars = [
    'https://example.com/avatar1.png',
    'https://example.com/avatar2.png',
    'https://example.com/avatar3.png',
  ];

  beforeEach(() => {
    render(
      <AvatarModal
        avatars={avatars}
        onClose={mockOnClose}
        onSelectAvatar={mockOnSelectAvatar}
      />
    );
  });

  it('renders correctly', () => {
    expect(screen.getByText('Select an Avatar')).toBeInTheDocument();
    avatars.forEach((avatar, index) => {
      expect(screen.getByAltText('Avatar')).toHaveAttribute('src', avatar);
    });
  });

  it('calls onClose when the close button is clicked', () => {
    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSelectAvatar with the correct avatar when an avatar is clicked', () => {
    avatars.forEach((avatar, index) => {
      fireEvent.click(screen.getAllByAltText('Avatar')[index]);
      expect(mockOnSelectAvatar).toHaveBeenCalledWith(avatar);
    });
  });
});
