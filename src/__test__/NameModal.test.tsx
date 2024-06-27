import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NameModal from '../components/Profiles/NameModal'; // Adjust the path according to your project structure

describe('NameModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const currentName = 'Admin';

  beforeEach(() => {
    render(
      <NameModal
        currentName={currentName}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
  });

  it('renders correctly with the current name', () => {
    expect(screen.getByText('Change Profile Name')).toBeInTheDocument();
    expect(screen.getByDisplayValue(currentName)).toBeInTheDocument();
  });

  it('calls onClose when the cancel button is clicked', () => {
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSave with the updated name when the save button is clicked', () => {
    const newName = 'New Admin';
    fireEvent.change(screen.getByDisplayValue(currentName), {
      target: { value: newName },
    });
    fireEvent.click(screen.getByText('Save'));
    expect(mockOnSave).toHaveBeenCalledWith(newName);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSave with the same name when the save button is clicked without changing the input', () => {
    fireEvent.click(screen.getByText('Save'));
    expect(mockOnSave).toHaveBeenCalledWith(currentName);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
