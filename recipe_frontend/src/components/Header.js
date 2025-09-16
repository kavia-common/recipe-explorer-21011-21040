import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';

// PUBLIC_INTERFACE
export default function Header() {
  /** Top navigation header with brand and quick actions */
  const { setSearch } = useRecipes();
  const location = useLocation();
  const navigate = useNavigate();

  const onNewSearch = () => {
    if (location.pathname !== '/recipes') navigate('/recipes');
    setSearch('');
    const el = document.getElementById('recipe-search-input');
    if (el) el.focus();
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-badge">R</div>
          <div className="brand-title">Recipe Explorer</div>
        </div>
        <nav aria-label="Primary" style={{ display: 'flex', gap: 8 }}>
          <Link className="btn btn-primary" to="/recipes">Browse</Link>
          <button className="btn" onClick={onNewSearch} aria-label="Start a new search">New Search</button>
        </nav>
        <div className="header-actions">
          <a
            className="btn btn-accent"
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
            aria-label="Help and Docs"
            title="Help & Docs"
          >
            Help
          </a>
        </div>
      </div>
    </header>
  );
}
