// __test__/Auth.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Auth from '../components/Authentifcation/Auth';

describe('Auth component', () => {
  it('renders login and register buttons', () => {
    render(<Auth />);
    const loginButton = screen.getByRole('button', { name: /login/i });
    const registerButton = screen.getByRole('button', { name: /register/i });
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('renders input fields for email and password', () => {
    render(<Auth />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('displays error message for invalid credentials', () => {
    render(<Auth />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'invalidemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    const errorMessage = screen.getByText(/invalid credentials/i);
    expect(errorMessage).toBeInTheDocument();
  });

  // Add more test cases as needed
});
