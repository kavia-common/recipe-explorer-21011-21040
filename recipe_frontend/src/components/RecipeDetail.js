import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';

// PUBLIC_INTERFACE
export default function RecipeDetail() {
  /** Detailed view of a recipe including ingredients and instructions */
  const { id } = useParams();
  const { recipes } = useRecipes();

  const recipe = useMemo(() => recipes.find(r => r.id === id), [recipes, id]);

  if (!recipe) {
    return (
      <section className="panel">
        <p>Recipe not found.</p>
        <Link className="btn btn-primary" to="/recipes">Back to list</Link>
      </section>
    );
  }

  return (
    <section className="panel detail" aria-label="Recipe detail">
      <div>
        <div className="hero">
          <div className="badge">🍽 {recipe.cuisine}</div>
          <h1>{recipe.title}</h1>
          <div className="sub">
            {recipe.difficulty} • ⏱ {recipe.time} minutes
          </div>
        </div>

        <div className="section" style={{ marginTop: 14 }}>
          <h3>Instructions</h3>
          <ol style={{ margin: '8px 0 0 20px', lineHeight: 1.6 }}>
            {recipe.instructions.map((step, idx) => (
              <li key={idx} style={{ marginBottom: 6 }}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      <div>
        <div className="section">
          <h3>Ingredients</h3>
          <ul style={{ marginTop: 8, lineHeight: 1.8 }}>
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>

        <div className="section" style={{ marginTop: 14 }}>
          <h3>Tags</h3>
          <div className="chips" style={{ marginTop: 8 }}>
            {recipe.tags.map(t => <span key={t} className="chip active">#{t}</span>)}
          </div>
        </div>

        <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
          <Link className="btn" to="/recipes">Back</Link>
          <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Scroll Top
          </button>
        </div>
      </div>
    </section>
  );
}
