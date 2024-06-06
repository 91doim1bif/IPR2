// __test__/Input.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '../components/Authentifcation/Input';

describe('Input component', () => {
  it('renders without crashing', () => {
    render(<Input />);
  });

  it('renders with the correct placeholder', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Email" />);
    const inputElement = getByPlaceholderText('Email');
    expect(inputElement).toBeInTheDocument();
  });

  it('invokes onChange callback when value changes', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<Input onChange={onChangeMock} />);
    const inputElement = getByTestId('input-element');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  // Add more test cases as needed
});
