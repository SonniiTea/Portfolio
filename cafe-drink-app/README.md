# Cafe Drink App (source monorepo)

This folder is a copy of the **Cafe Drink App** project for reference and future development.

- **`apps/web`** — full Vite + React Router app (API routes, auth, etc.).
- **`apps/mobile`** — Expo / React Native app.

The portfolio site **does not** run this stack directly. Instead, it uses a lightweight React implementation in:

- `src/cafe-drink/CafeDrinkApp.jsx` — UI embedded in the portfolio
- `src/cafe-drink/data/drinks.js` — recipe data (keep in sync with `apps/web/src/data/drinks.js` when you change recipes)

To develop the full web app locally (from this folder):

```bash
cd apps/web
npm install --legacy-peer-deps
npm run dev
```

The dev server prints its URL (often **`http://localhost:4000/`**). If `npm install` fails with a peer-dependency error, `--legacy-peer-deps` is required because some packages expect `@types/react` v19 while this app pins React 18 types.

(Use the scripts defined in `apps/web/package.json`; the Create React App portfolio is separate at the repo root.)
