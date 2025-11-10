# Speed Ecom — Throwaway MVP

This repository contains a minimal "throwaway" MERN-style MVP (but with mock data) for speed: a Node/Express backend serving mock products and a Vite + React frontend that consumes it. The goal is to be runnable quickly and demonstrate the flow (login, view products, add to cart, simple chatbot filter).

## What you get
- Backend: `server/server.js` — express server with mock products and routes:
  - `GET /api/products` — returns all products
  - `POST /api/login` — fake login, accepts any non-empty username/password and returns a token
  - `GET /api/bot?msg=...` — simple keyword-based bot that returns filtered products
- Frontend: `client/` — Vite + React app with simple pages: `/login` and `/` (store). Includes a fixed bottom-right `SimpleBot` that filters the product list.

## Quick start (Windows PowerShell)

1. Install server deps and run server:

```powershell
cd .\speed-ecom\server
npm install
npm run dev
```

2. In a new terminal, install and run the client:

```powershell
cd .\speed-ecom\client
npm install
npm run dev
```

3. Open the client URL printed by Vite (usually http://localhost:5173) and the server runs on http://localhost:5000.

## Flow to test
1. Visit `/login` and enter any non-empty username/password (e.g. `user` / `pass`).
2. After login you return to the store where 5 sample products are shown.
3. Use the bot (bottom-right) and type `show me laptops` or `I need shoes` — the list will filter.
4. Click `Add to Cart` to increment the cart count shown in header.

## Notes & next steps
- This uses mock data inside `server/server.js`. For production, replace it with MongoDB and add proper JWT auth.
- The chatbot is a keyword-based filter, intentionally simple for a 30-minute MVP.
