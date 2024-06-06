import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For using jest-dom matchers

import Modal from './Modal';

describe('Modal Component', () => {
  test('should render without crashing', () => {
    render(<Modal isOpen={true} onClose={() => {}} />);
  });

  test('should render children when isOpen is true', () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Test Content</div>
      </Modal>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  test('should not render children when isOpen is false', () => {
    const { queryByText } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Test Content</div>
      </Modal>
    );

    expect(queryByText('Test Content')).toBeNull();
  });

  test('should call onClose when Close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Test Content</div>
      </Modal>
    );

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
