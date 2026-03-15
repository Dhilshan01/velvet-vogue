# Velvet Vogue — Rebuilt

A full-stack fashion e-commerce app build with **React + Tailwind CSS + Node.js + PostgreSQL**.

## Tech Stack


| Frontend  | React 18 + Tailwind CSS 3    |
| Backend   | Node.js (Express)            |
| Database  | PostgreSQL                   |
| Auth      | JWT + bcrypt          |
| Routing   | React Router v6              |

## Project Structure

```
velvet-vogue/
├── backend/
│   ├── db/
│   │   ├── schema.sql      # PostgreSQL schema + seed data
│   │   └── pool.js         # pg connection pool
│   ├── middleware/
│   │   └── auth.js         # JWT Bearer middleware
│   ├── routes/
│   │   ├── auth.js         # register / login / /me
│   │   ├── products.js     # GET products (filterable by category)
│   │   └── cart.js         # Full cart CRUD (protected)
│   ├── server.js           # Express app entry point
│   ├── .env.example        # Environment variable template
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx       # Outlet wrapper
    │   │   ├── Navbar.jsx       # Sticky nav + cart badge + auth state
    │   │   ├── Footer.jsx
    │   │   └── ProductCard.jsx  # Hover-to-reveal Add to Cart
    │   ├── context/
    │   │   ├── AuthContext.jsx  # user, login, register, logout
    │   │   └── CartContext.jsx  # items, addToCart, updateItem, removeItem
    │   ├── lib/
    │   │   └── api.js           # Typed API client (auto-injects JWT)
    │   ├── pages/
    │   │   ├── Home.jsx         # Hero + categories + featured products
    │   │   ├── Men.jsx
    │   │   ├── Women.jsx
    │   │   ├── Cart.jsx         # Full cart with qty controls + summary
    │   │   ├── Login.jsx        # Split-screen design
    │   │   ├── Register.jsx
    │   │   └── Contact.jsx      # Contact form with success state
    │   ├── index.css            # Tailwind + custom tokens + animations
    │   └── main.jsx
    ├── tailwind.config.js       # Custom colors + fonts
    ├── vite.config.js
    └── package.json
```

## Setup & Running

### 1. Database
```bash
psql -U postgres -c "CREATE DATABASE velvet_vogue;"
psql -U postgres -d velvet_vogue -f backend/db/schema.sql
```

### 2. Backend
```bash
cd backend
cp .env.example .env
# Edit .env: set DATABASE_URL and JWT_SECRET
npm install
npm run dev       # runs on http://localhost:4000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev       # runs on http://localhost:5173
```

The Vite dev server proxies `/api` requests to the backend automatically.

## API Endpoints

| Method | Path                  | Auth | Description              |
|--------|-----------------------|------|--------------------------|
| POST   | /api/auth/register    | —    | Register new user        |
| POST   | /api/auth/login       | —    | Login, returns JWT       |
| GET    | /api/auth/me          | ✓    | Get current user         |
| GET    | /api/products         | —    | All products             |
| GET    | /api/products?category=men | — | Filtered products    |
| GET    | /api/products/:id     | —    | Single product           |
| GET    | /api/cart             | ✓    | Get user's cart          |
| POST   | /api/cart             | ✓    | Add/upsert item          |
| PATCH  | /api/cart/:id         | ✓    | Update quantity          |
| DELETE | /api/cart/:id         | ✓    | Remove item              |

## Design System

- **Font**: Cormorant Garamond (display) + DM Sans (body)
- **Palette**: `ink` #0f0e0d · `cream` #f5f0e8 · `copper` #b87333 · `rust` #8b3a1e · `sand` #e8ddd0
- **Aesthetic**: Luxury editorial — generous whitespace, serif headings, muted warm tones
