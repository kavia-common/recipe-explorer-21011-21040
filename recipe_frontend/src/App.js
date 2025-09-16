import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import { RecipeProvider } from './context/RecipeContext';

/**
 * PUBLIC_INTERFACE
 * App is the root component that sets up layout and routing for the Recipe Explorer.
 * Layout: Header (top), Sidebar (left), Main content (right).
 * Routes:
 *  - /recipes: list with search + filters
 *  - /recipes/:id: detail page
 *  - default redirect to /recipes
 */
function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="app-shell">
          <Header />
          <div className="content-area">
            <Sidebar />
            <main className="main-content" role="main" aria-live="polite">
              <Routes>
                <Route path="/" element={<Navigate to="/recipes" replace />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
                <Route path="*" element={<Navigate to="/recipes" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;
