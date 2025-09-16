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
  // Theme management with persistence
  const [theme, setTheme] = React.useState(() => {
    // Prefer saved theme, else user OS preference, else light
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
    if (saved === 'light' || saved === 'dark') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <RecipeProvider>
      <Router>
        <div className="app-shell">
          <Header theme={theme} onToggleTheme={toggleTheme} />
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
