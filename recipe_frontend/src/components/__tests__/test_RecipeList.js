import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RecipeList from '../RecipeList';
import RecipeDetail from '../RecipeDetail';
import { RecipeProvider } from '../../context/RecipeContext';

function renderListAt(path = '/recipes') {
  return render(
    <RecipeProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
        </Routes>
      </MemoryRouter>
    </RecipeProvider>
  );
}

test('renders list with count and search functionality', () => {
  renderListAt('/recipes');
  // All Recipes heading
  expect(screen.getByRole('heading', { name: /All Recipes/i })).toBeInTheDocument();

  const input = screen.getByRole('textbox', { name: /Search recipes/i });
  expect(input).toBeInTheDocument();

  // Initially shows 6 items
  expect(screen.getByText(/6 items/i)).toBeInTheDocument();

  // Search narrows down
  fireEvent.change(input, { target: { value: 'pizza' } });
  // Now should show 1 item
  expect(screen.getByText(/1 items/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Open details for Classic Margherita Pizza/i })).toBeInTheDocument();
});

test('tag toggling filters results', () => {
  renderListAt('/recipes');

  // Find a tag chip (e.g., Vegetarian exists)
  const vegetarian = screen.getByRole('option', { name: /#Vegetarian/i });
  fireEvent.click(vegetarian);
  // Expect chips to be active (aria-pressed true)
  expect(vegetarian).toHaveAttribute('aria-pressed', 'true');

  // There are two Vegetarian recipes in mock data: Quinoa Salad and Margherita Pizza
  expect(screen.getByText(/2 items/i)).toBeInTheDocument();

  // Toggle another tag to narrow further (e.g., Baking)
  const baking = screen.getByRole('option', { name: /#Baking/i });
  fireEvent.click(baking);
  // Now only Margherita Pizza should match (Vegetarian + Baking)
  expect(screen.getByText(/1 items/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Open details for Classic Margherita Pizza/i })).toBeInTheDocument();

  // Unselect tags resets back
  fireEvent.click(vegetarian);
  fireEvent.click(baking);
  expect(screen.getByText(/6 items/i)).toBeInTheDocument();
});

test('navigates to detail by click and Enter key', () => {
  renderListAt('/recipes');
  const card = screen.getByRole('button', { name: /Open details for/i });

  // Click to navigate
  fireEvent.click(card);
  expect(screen.getByLabelText(/Recipe detail/i)).toBeInTheDocument();

  // Go back by manipulating history
  window.history.back();

  // Re-render list route to test keyboard
  renderListAt('/recipes');
  const card2 = screen.getByRole('button', { name: /Open details for/i });
  fireEvent.keyDown(card2, { key: 'Enter', code: 'Enter', charCode: 13 });
  expect(screen.getByLabelText(/Recipe detail/i)).toBeInTheDocument();
});
