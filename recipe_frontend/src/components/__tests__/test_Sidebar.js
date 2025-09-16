import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';
import RecipeList from '../RecipeList';
import { RecipeProvider } from '../../context/RecipeContext';

function renderWithProvider(ui) {
  return render(
    <RecipeProvider>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </RecipeProvider>
  );
}

test('renders categories including All and shows counts', () => {
  renderWithProvider(<Sidebar />);
  expect(screen.getByText('Categories')).toBeInTheDocument();

  // The mock data includes categories All + Mediterranean, Thai, Italian, Japanese, Indian, Mexican
  const expected = ['All', 'Indian', 'Italian', 'Japanese', 'Mediterranean', 'Mexican', 'Thai'].sort();
  const found = expected.map(cat => screen.getByText(cat));
  expect(found.length).toBe(expected.length);

  // Check counts (All should be 6)
  expect(screen.getByText('All').closest('button')).toHaveTextContent('6');
});

test('clicking a category sets active state and filters list', () => {
  render(
    <RecipeProvider>
      <MemoryRouter initialEntries={['/recipes']}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16 }}>
          <Sidebar />
          <RecipeList />
        </div>
      </MemoryRouter>
    </RecipeProvider>
  );

  // Initially All Recipes
  expect(screen.getByRole('heading', { name: /All Recipes/i })).toBeInTheDocument();
  // Click Italian
  const italianBtn = screen.getByRole('button', { name: /Italian/ });
  fireEvent.click(italianBtn);

  // Heading updates
  expect(screen.getByRole('heading', { name: /Italian Recipes/i })).toBeInTheDocument();

  // Only one Italian recipe exists in mock data
  expect(screen.getByText(/1 items/i)).toBeInTheDocument();
  expect(italianBtn).toHaveAttribute('aria-pressed', 'true');
});
