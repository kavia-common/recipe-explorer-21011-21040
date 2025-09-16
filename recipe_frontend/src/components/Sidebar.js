import React from 'react';
import { useRecipes } from '../context/RecipeContext';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar for categories with counts and active state */
  const { categories, activeCategory, setActiveCategory, recipes } = useRecipes();

  const countFor = (cat) =>
    cat === 'All' ? recipes.length : recipes.filter(r => r.cuisine === cat).length;

  return (
    <aside className="sidebar" aria-label="Recipe categories">
      <div className="sidebar-title">Categories</div>
      <div className="category-list">
        {categories.map(cat => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              className={`category-item ${active ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={active}
            >
              <span>{cat}</span>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{countFor(cat)}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
