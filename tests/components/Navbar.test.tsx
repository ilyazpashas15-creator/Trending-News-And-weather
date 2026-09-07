import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar, { NAVBAR_CATEGORIES } from '@/components/ui/Navbar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock contexts
jest.mock('@/context/BookmarkContext', () => ({
  useBookmarks: () => ({
    bookmarks: [],
    addBookmark: jest.fn(),
    removeBookmark: jest.fn(),
    isBookmarked: () => false,
    toggleBookmark: jest.fn(),
  }),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: false,
  }),
}));

jest.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'dark',
    toggleTheme: jest.fn(),
  }),
}));

describe('Navbar Component', () => {
  it('renders all 8 main navigation categories', () => {
    render(<Navbar />);

    // All 8 categories requested by user
    expect(screen.getAllByText('News').length).toBeGreaterThan(0);
    expect(screen.getAllByText('World Clock').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Time Zones').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Calendar').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Weather').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Timers').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Calculators').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Sun, Moon & Space').length).toBeGreaterThan(0);
  });

  it('renders action buttons including Profile, Logout, Bookmarks, and Notifications', () => {
    render(<Navbar />);

    // Profile and Logout/Login pills
    expect(screen.getByRole('link', { name: /Profile/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Logout/i })).toBeInTheDocument();

    // Notifications and Bookmarks buttons
    expect(screen.getByLabelText(/Notifications/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Saved Reads/i)).toBeInTheDocument();
  });

  it('opens category dropdown and displays sub-options', () => {
    render(<Navbar />);

    // Click News category
    const newsButtons = screen.getAllByRole('button', { name: /News/i });
    fireEvent.click(newsButtons[0]);

    // Sub-items of News
    expect(screen.getByText('World News')).toBeInTheDocument();
    expect(screen.getByText('Local News')).toBeInTheDocument();
    expect(screen.getByText('Weather News')).toBeInTheDocument();
    expect(screen.getByText('Breaking News')).toBeInTheDocument();
    expect(screen.getByText('News Archive')).toBeInTheDocument();
  });

  it('opens Weather dropdown and displays sub-options', () => {
    render(<Navbar />);

    // Click Weather category
    const weatherButtons = screen.getAllByRole('button', { name: /Weather/i });
    fireEvent.click(weatherButtons[0]);

    // Sub-items of Weather
    expect(screen.getByText('Current Weather')).toBeInTheDocument();
    expect(screen.getByText('5-Day Forecast')).toBeInTheDocument();
    expect(screen.getByText('Hourly Weather')).toBeInTheDocument();
    expect(screen.getByText('Weather Maps')).toBeInTheDocument();
    expect(screen.getByText('Severe Weather Alerts')).toBeInTheDocument();
  });

  it('toggles mobile menu and expands accordion categories', () => {
    render(<Navbar />);

    const hamburger = screen.getByLabelText('Open mobile menu');
    expect(hamburger).toBeInTheDocument();

    // Open mobile menu
    fireEvent.click(hamburger);

    // Mobile menu drawer should display all 8 categories
    const newsAccordion = screen.getByRole('button', { name: /📰 News/i });
    expect(newsAccordion).toBeInTheDocument();

    // Expand News accordion
    fireEvent.click(newsAccordion);
    expect(screen.getByText('World News')).toBeInTheDocument();
  });
});
