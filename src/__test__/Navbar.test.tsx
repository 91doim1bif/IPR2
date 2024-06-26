// Navbar.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

jest.mock('../components/Navbar/NavbarItem', () => ({ label, onClick }: { label: string; onClick: () => void }) => (
  <div onClick={onClick} data-testid={`navbar-item-${label}`}>
    {label}
  </div>
));

jest.mock('../components/Navbar/AccountMenu', () => ({ visible }: { visible: boolean }) =>
  visible ? <div data-testid="account-menu">Account Menu</div> : null
);

jest.mock('../components/Navbar/MobileMenu', () => ({ visible }: { visible: boolean }) =>
  visible ? <div data-testid="mobile-menu">Mobile Menu</div> : null
);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders navbar and handles scrolling', async () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    fireEvent.scroll(window, { target: { scrollY: 100 } });
    await waitFor(() =>
      expect(screen.getByRole('navigation')).toHaveClass('bg-zinc-900 bg-opacity-90')
    );

    fireEvent.scroll(window, { target: { scrollY: 0 } });
    await waitFor(() =>
      expect(screen.getByRole('navigation')).not.toHaveClass('bg-zinc-900 bg-opacity-90')
    );
  });

  test('navigates to correct path on logo click', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByAltText('Logo'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('toggles mobile menu', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Browse'));
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Browse'));
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  test('toggles account menu', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByAltText('Profile'));
    expect(screen.getByTestId('account-menu')).toBeInTheDocument();

    fireEvent.click(screen.getByAltText('Profile'));
    expect(screen.queryByTestId('account-menu')).not.toBeInTheDocument();
  });

  test('navigates to correct path on navbar item click', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const homeItem = screen.getByTestId('navbar-item-Home');
    fireEvent.click(homeItem);
    expect(mockNavigate).toHaveBeenCalledWith('/home');

    const seriesItem = screen.getByTestId('navbar-item-Series');
    fireEvent.click(seriesItem);
    expect(mockNavigate).toHaveBeenCalledWith('/series');
  });

  test('displays search and notification icons', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByTestId('notification-icon')).toBeInTheDocument();
  });
});
