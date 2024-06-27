import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../components/Profiles/Modal';

describe('Modal Component', () => {
  const mockClose = jest.fn();

  const renderModal = (isOpen: boolean) => {
    render(
      <Modal isOpen={isOpen} onClose={mockClose}>
        <div>Modal Content</div>
      </Modal>
    );
  };

  it('should render modal content when isOpen is true', () => {
    renderModal(true);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should not render modal content when isOpen is false', () => {
    renderModal(false);
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    renderModal(true);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when overlay is clicked', () => {
    renderModal(true);
    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when modal content is clicked', () => {
    renderModal(true);
    fireEvent.click(screen.getByText('Modal Content'));
    expect(mockClose).not.toHaveBeenCalled();
  });

  it('should have proper ARIA roles for accessibility', () => {
    renderModal(true);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});
