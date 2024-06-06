import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AuthProvider } from '../components/Authentifcation/AuthProvider';

describe('App Component', () => {
  test('renders Auth component for /auth route', () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/auth']}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByText('Auth Component')).toBeInTheDocument(); // Adjust text accordingly
  });

  test('renders Profiles component for /profiles route', () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/profiles']}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByText('Profiles Component')).toBeInTheDocument(); // Adjust text accordingly
  });

  // Add more tests for other routes as needed
});
