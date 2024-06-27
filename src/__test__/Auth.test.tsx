// Auth.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Auth from '../components/Authentifcation/Auth';
import { useAuth } from '../components/Authentifcation/AuthProvider';

// Mock the useAuth hook
jest.mock('../components/Authentifcation/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

const mockLogin = jest.fn();
const mockRegister = jest.fn();
const mockGithubLogin = jest.fn();

(useAuth as jest.Mock).mockReturnValue({
  login: mockLogin,
  register: mockRegister,
  githubLogin: mockGithubLogin,
  error: null,
});

describe('Auth Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn(); // Mock console.log
  });

  test('renders login form by default and checks initial state', () => {
    render(
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.queryByLabelText('Username')).not.toBeInTheDocument();
  });

  test('toggles to register form and updates state', () => {
    render(
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Create an account'));

    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  test('updates form input state', () => {
    render(
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    expect(screen.getByLabelText('Email')).toHaveValue('test@example.com');
    expect(screen.getByLabelText('Password')).toHaveValue('password123');
  });

  test('login action', async () => {
    render(
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123')
    );
  });

  test('register action', async () => {
    render(
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Create an account'));

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('Sign up'));

    await waitFor(() =>
      expect(mockRegister).toHaveBeenCalledWith(
        'testuser',
        'test@example.com',
        'password123'
      )
    );
  });

  test('handles Google login click', () => {
    render(
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    );

    const googleButton = screen.getByRole('button', {
      name: /login with google/i,
    });
    fireEvent.click(googleButton);

    // Check that the click logs to console
    expect(console.log).toHaveBeenCalledWith('Login with Google');
  });

  test('handles GitHub login click', () => {
    delete (window as any).location;
    (window as any).location = { href: '' };

    render(
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    );

    const githubButton = screen.getByRole('button', {
      name: /login with github/i,
    });
    fireEvent.click(githubButton);

    expect(window.location.href).toContain(
      'https://github.com/login/oauth/authorize?client_id='
    );
  });

  test('login with admin credentials', async () => {
    render(
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'admin@net-movies.de' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'admin' },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith('admin@net-movies.de', 'admin')
    );
  });

  test('login with user credentials', async () => {
    render(
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'user@net-movies.de' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'user' },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith('user@net-movies.de', 'user')
    );
  });
});
