import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock matchMedia for theme detection
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // deprecated
      removeListener: () => {}, // deprecated
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

describe('App integration', () => {
  test('renders header, sidebar, and list by default', async () => {
    render(<App />);
    expect(screen.getByText(/Recipe Explorer/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Recipe categories/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Recipe list/i)).toBeInTheDocument();
    // Shows All Recipes heading
    expect(screen.getByRole('heading', { name: /All Recipes/i })).toBeInTheDocument();
  });

  test('navigates to detail page when clicking a recipe card', async () => {
    render(<App />);
    const anyCard = await screen.findByRole('button', { name: /Open details for/i });
    fireEvent.click(anyCard);
    // Detail page should show "Recipe detail" region and back button
    expect(await screen.findByLabelText(/Recipe detail/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Scroll Top/i })).toBeInTheDocument();
  });

  test('theme toggle updates body attribute and persists to localStorage', async () => {
    // Ensure no prior value
    window.localStorage.removeItem('theme');

    render(<App />);

    // Starts in light (unless OS prefers dark, but we mocked to false)
    await waitFor(() => {
      expect(document.body.getAttribute('data-theme')).toBe('light');
    });

    const toggle = screen.getByRole('button', { name: /Switch to dark theme/i });
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(document.body.getAttribute('data-theme')).toBe('dark');
      expect(window.localStorage.getItem('theme')).toBe('dark');
    });

    // Toggle back to light
    const toggleBack = screen.getByRole('button', { name: /Switch to light theme/i });
    fireEvent.click(toggleBack);

    await waitFor(() => {
      expect(document.body.getAttribute('data-theme')).toBe('light');
      expect(window.localStorage.getItem('theme')).toBe('light');
    });
  });
});
