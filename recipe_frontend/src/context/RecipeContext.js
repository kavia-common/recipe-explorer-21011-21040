import React, { createContext, useContext, useMemo, useState } from 'react';

// Mock recipe data (could be replaced by API integration)
// Each recipe has id, title, cuisine, difficulty, time, ingredients, instructions, tags
const MOCK_RECIPES = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Salad',
    cuisine: 'Mediterranean',
    difficulty: 'Easy',
    time: 20,
    ingredients: [
      '1 cup quinoa', 'Cherry tomatoes', 'Cucumber', 'Red onion',
      'Kalamata olives', 'Feta cheese', 'Olive oil', 'Lemon', 'Parsley', 'Salt & pepper'
    ],
    instructions: [
      'Cook quinoa and let it cool.',
      'Chop vegetables and mix in a large bowl.',
      'Add cooled quinoa, olives, and feta.',
      'Dress with olive oil, lemon juice, salt, pepper, and parsley.',
    ],
    tags: ['Vegetarian', 'Gluten-Free', 'Salad']
  },
  {
    id: '2',
    title: 'Spicy Thai Basil Chicken',
    cuisine: 'Thai',
    difficulty: 'Medium',
    time: 30,
    ingredients: [
      'Chicken thighs', 'Thai basil', 'Garlic', 'Chili', 'Soy sauce', 'Fish sauce', 'Sugar', 'Onion'
    ],
    instructions: [
      'Sauté garlic and chili.',
      'Add chicken and cook until browned.',
      'Add sauces and sugar; simmer.',
      'Stir in basil until wilted. Serve with rice.'
    ],
    tags: ['Spicy', 'Stir-Fry', 'Dinner']
  },
  {
    id: '3',
    title: 'Classic Margherita Pizza',
    cuisine: 'Italian',
    difficulty: 'Medium',
    time: 45,
    ingredients: [
      'Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Basil', 'Olive oil', 'Salt'
    ],
    instructions: [
      'Preheat oven at highest setting.',
      'Stretch dough, add sauce and mozzarella.',
      'Bake until crust is golden, finish with basil and olive oil.'
    ],
    tags: ['Vegetarian', 'Baking']
  },
  {
    id: '4',
    title: 'Teriyaki Salmon Bowl',
    cuisine: 'Japanese',
    difficulty: 'Easy',
    time: 25,
    ingredients: [
      'Salmon fillets', 'Soy sauce', 'Mirin', 'Sugar', 'Garlic', 'Rice', 'Broccoli'
    ],
    instructions: [
      'Make teriyaki sauce and reduce slightly.',
      'Pan-sear salmon and glaze with sauce.',
      'Serve over rice with steamed broccoli.'
    ],
    tags: ['Seafood', 'Gluten-Free', 'Bowl']
  },
  {
    id: '5',
    title: 'Chana Masala',
    cuisine: 'Indian',
    difficulty: 'Medium',
    time: 35,
    ingredients: [
      'Chickpeas', 'Onion', 'Tomato', 'Garlic', 'Ginger', 'Garam masala', 'Turmeric', 'Cumin', 'Coriander'
    ],
    instructions: [
      'Sauté onions, garlic, ginger, and spices.',
      'Add tomatoes and simmer.',
      'Add chickpeas and cook until flavors meld.'
    ],
    tags: ['Vegan', 'Gluten-Free', 'Curry']
  },
  {
    id: '6',
    title: 'Beef Tacos with Pico de Gallo',
    cuisine: 'Mexican',
    difficulty: 'Easy',
    time: 25,
    ingredients: [
      'Ground beef', 'Taco seasoning', 'Tortillas', 'Tomatoes', 'Onion', 'Cilantro', 'Lime'
    ],
    instructions: [
      'Cook seasoned beef.',
      'Prepare pico de gallo.',
      'Assemble tacos with toppings of choice.'
    ],
    tags: ['Quick', 'Dinner']
  }
];

const RecipeContext = createContext(null);

// PUBLIC_INTERFACE
export const useRecipes = () => {
  /** Hook to access recipe state and actions */
  const ctx = useContext(RecipeContext);
  if (!ctx) throw new Error('useRecipes must be used within a RecipeProvider');
  return ctx;
};

// PUBLIC_INTERFACE
export function RecipeProvider({ children }) {
  /**
   * Provides recipes, categories, filters, search term, and helpers.
   * Replace MOCK_RECIPES with API calls when backend is ready.
   */
  const [recipes] = useState(MOCK_RECIPES);
  const categories = useMemo(() => {
    const cuisines = Array.from(new Set(recipes.map(r => r.cuisine))).sort();
    return ['All', ...cuisines];
  }, [recipes]);

  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [activeTags, setActiveTags] = useState([]);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    recipes.forEach(r => r.tags.forEach(t => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [recipes]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return recipes.filter(r => {
      const matchCategory = activeCategory === 'All' || r.cuisine === activeCategory;
      const matchSearch =
        !s ||
        r.title.toLowerCase().includes(s) ||
        r.ingredients.join(' ').toLowerCase().includes(s);
      const matchTags = activeTags.length === 0 || activeTags.every(t => r.tags.includes(t));
      return matchCategory && matchSearch && matchTags;
    });
  }, [recipes, search, activeCategory, activeTags]);

  const toggleTag = (tag) =>
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const value = {
    recipes,
    categories,
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
    activeTags,
    toggleTag,
    allTags,
    filtered,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
}
