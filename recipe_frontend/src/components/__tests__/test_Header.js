import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Header from '../Header';
import { RecipeProvider, useRecipes } from '../../context/RecipeContext';
import RecipeList from '../RecipeList';

// Helper to render Header within routing and provider context
function renderWithContext(ui, { route = '/recipes' } = {}) {
  window.history.pushState({}, 'Test page', route);
  return render(
    <RecipeProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/recipes" element={
            <>
              <Header theme="light" onToggleTheme={() => {}} />
              <RecipeList />
            </>
          } />
          <Route path="*" element={<Header theme="light" onToggleTheme={() => {}} />} />
        </Routes>
      </MemoryRouter>
    </RecipeProvider>
  );
}

test('renders brand and navigation', () => {
  renderWithContext(<Header theme="light" onToggleTheme={() => {}} />);
  expect(screen.getByText(/Recipe Explorer/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Browse/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /New Search/i })).toBeInTheDocument();
});

test('toggle shows current theme label and calls handler', () => {
  const onToggle = jest.fn();
  render(
    <RecipeProvider>
      <MemoryRouter initialEntries={['/recipes']}>
        <Header theme="dark" onToggleTheme={onToggle} />
      </MemoryRouter>
    </RecipeProvider>
  );
  const toggle = screen.getByRole('button', { name: /Switch to light theme/i });
  expect(screen.getByText(/Dark/i)).toBeInTheDocument();
  fireEvent.click(toggle);
  expect(onToggle).toHaveBeenCalledTimes(1);
});

test('New Search clears search and focuses input, ensuring on /recipes route', () => {
  renderWithContext(<Header theme="light" onToggleTheme={() => {}} />);
  const input = screen.getByRole('textbox', { name: /Search recipes/i });
  // Type something
  fireEvent.change(input, { target: { value: 'pizza' } });
  expect(input).toHaveValue('pizza');

  // Click "New Search" should clear and focus
  fireEvent.click(screen.getByRole('button', { name: /New Search/i }));
  expect(input).toHaveValue('');
  // Focus may not always assert reliably in JSDOM, but we can check document.activeElement
  expect(document.activeElement).toBe(input);
}
