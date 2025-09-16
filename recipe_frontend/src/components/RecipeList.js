import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';

// PUBLIC_INTERFACE
export default function RecipeList() {
  /** Lists recipes with search and tag filters */
  const { filtered, search, setSearch, allTags, activeTags, toggleTag, activeCategory } = useRecipes();
  const navigate = useNavigate();

  return (
    <section className="panel" aria-label="Recipe list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <h2 style={{ letterSpacing: '-0.3px' }}>
          {activeCategory === 'All' ? 'All Recipes' : `${activeCategory} Recipes`}
        </h2>
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{filtered.length} items</span>
      </div>

      <div className="search-bar">
        <input
          id="recipe-search-input"
          className="input"
          type="text"
          placeholder="Search recipes, ingredients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search recipes"
        />
        <button className="btn btn-primary" onClick={() => { /* reserved for future */ }}>
          Search
        </button>
      </div>

      <div className="chips" role="listbox" aria-label="Filter by tags">
        {allTags.map(tag => {
          const active = activeTags.includes(tag);
          return (
            <button
              key={tag}
              className={`chip ${active ? 'active' : ''}`}
              onClick={() => toggleTag(tag)}
              aria-pressed={active}
              role="option"
            >
              #{tag}
            </button>
          );
        })}
      </div>

      <div className="grid">
        {filtered.map(r => (
          <article
            key={r.id}
            className="card"
            onClick={() => navigate(`/recipes/${r.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/recipes/${r.id}`)}
            aria-label={`Open details for ${r.title}`}
          >
            <div className="card-media">
              {r.title.split(' ').slice(0, 2).join(' ')}
            </div>
            <div className="card-body">
              <h3 className="card-title">{r.title}</h3>
              <div className="card-subtitle">{r.cuisine} • {r.difficulty}</div>
              <div className="meta">
                <div>⏱ {r.time}m</div>
                <div>🥣 {r.ingredients.length} items</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
