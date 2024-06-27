import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AccountMenu from '../components/Navbar/AccountMenu';
import { useAuth } from '../components/Authentifcation/AuthProvider';
import '@testing-library/jest-dom';

// Mock useAuth hook
jest.mock('../components/Authentifcation/AuthProvider');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock Axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn() },
    },
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  })),
}));

describe('AccountMenu Component', () => {
  const mockLogout = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      user: { _id: '1', name: 'Test User', email: 'test@example.com', image: '' },
      loading: false,
      error: null,
      login: jest.fn(),
      register: jest.fn(),
      logout: mockLogout,
      googleLogin: jest.fn(),
      githubLogin: jest.fn(),
      mutate: jest.fn(),
    });
    (jest.requireActual('react-router-dom') as any).useNavigate = () => mockNavigate;
  });

  const renderComponent = (visible: boolean) => {
    return render(
      <MemoryRouter>
        <AccountMenu visible={visible} />
      </MemoryRouter>
    );
  };

  test('does not render menu when not visible', () => {
    renderComponent(false);
    expect(screen.queryByText('Test User')).not.toBeInTheDocument();
  });

  test('renders menu when visible', () => {
    renderComponent(true);
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Switch Profiles')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  test('calls logout and navigates to /auth when logout is clicked', async () => {
    renderComponent(true);

    fireEvent.click(screen.getByText('Log out'));

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/auth');
  });

  test('navigates to /profiles when Switch Profiles is clicked', () => {
    renderComponent(true);

    fireEvent.click(screen.getByText('Switch Profiles'));

    expect(mockNavigate).toHaveBeenCalledWith('/profiles');
  });

  test('navigates to /settings when Settings is clicked', () => {
    renderComponent(true);

    fireEvent.click(screen.getByText('Settings'));

    expect(mockNavigate).toHaveBeenCalledWith('/settings');
  });
});
