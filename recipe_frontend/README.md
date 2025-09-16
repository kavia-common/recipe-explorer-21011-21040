# Recipe Explorer Frontend

React-based UI for browsing and searching recipes using the "Ocean Professional" theme (blue & amber accents, subtle gradients, rounded corners, minimalist design).

## Features
- Header navigation, category sidebar, and main content layout
- Browse and search recipes; filter by cuisine and tags
- Responsive card grid and detailed recipe view
- Smooth transitions, subtle shadows, accent highlights
- No backend required (mock data via context)

## Run
- npm start
- npm test
- npm run build

## Structure
- src/context/RecipeContext.js – global state (recipes, filters)
- src/components/Header.js – top navigation
- src/components/Sidebar.js – category list
- src/components/RecipeList.js – search + list/grid
- src/components/RecipeDetail.js – detail view
- src/App.css – Ocean Professional theme styles and layout

## Theming
Theme variables are defined in App.css (`--primary`, `--secondary`, `--bg`, `--surface`, `--text`, etc.). Adjust as needed to refine the look and feel.
