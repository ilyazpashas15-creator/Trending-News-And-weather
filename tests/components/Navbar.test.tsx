import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/ui/Navbar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
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
  it('renders site branding and navigation categories', () => {
    render(<Navbar />);

    // Brand title
    expect(screen.getByText('My Weather')).toBeInTheDocument();
    expect(screen.getByText('& News')).toBeInTheDocument();

    // Categories
    expect(screen.getByText('Weather')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('World Clock')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
  });

  it('renders search bar and action buttons', () => {
    render(<Navbar />);

    // Search input
    expect(screen.getByPlaceholderText('Search weather, news, cities...')).toBeInTheDocument();

    // Notifications and Bookmarks buttons
    expect(screen.getByLabelText(/Notifications/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Saved Reads/i)).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Navbar />);

    const hamburger = screen.getByLabelText('Open mobile menu');
    expect(hamburger).toBeInTheDocument();

    // Initially mobile drawer is closed
    expect(screen.queryByText('Weather Hub')).not.toBeInTheDocument();

    // Open mobile menu
    fireEvent.click(hamburger);

    // Mobile menu accordions should be present
    expect(screen.getAllByText(/Saved Reads/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Weather Alerts/i)).toBeInTheDocument();
  });

  it('opens dropdown when category button is clicked', () => {
    render(<Navbar />);

    const weatherBtn = screen.getByText('Weather');
    fireEvent.click(weatherBtn);

    // Weather dropdown content
    expect(screen.getByText('Weather Hub')).toBeInTheDocument();
    expect(screen.getByText('Current Weather')).toBeInTheDocument();
    expect(screen.getByText('5-Day Forecast')).toBeInTheDocument();
  });
});
