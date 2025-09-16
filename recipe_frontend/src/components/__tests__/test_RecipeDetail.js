import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RecipeDetail from '../RecipeDetail';
import { RecipeProvider } from '../../context/RecipeContext';

function renderDetailAt(path) {
  return render(
    <RecipeProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/recipes/:id" element={<RecipeDetail />} />
        </Routes>
      </MemoryRouter>
    </RecipeProvider>
  );
}

test('renders recipe detail when id exists', async () => {
  renderDetailAt('/recipes/3'); // Classic Margherita Pizza
  expect(await screen.findByLabelText(/Recipe detail/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Classic Margherita Pizza/i })).toBeInTheDocument();
  // Ingredients and Instructions sections
  expect(screen.getByRole('heading', { name: /Ingredients/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Instructions/i })).toBeInTheDocument();
  // Cuisine badge
  expect(screen.getByText(/Italian/i)).toBeInTheDocument();
});

test('shows not found for unknown recipe id', async () => {
  renderDetailAt('/recipes/999');
  expect(await screen.findByText(/Recipe not found/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Back to list/i })).toBeInTheDocument();
});
