-- Velvet Vogue PostgreSQL Schema

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username    VARCHAR(50)  UNIQUE NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    TEXT NOT NULL,  -- bcrypt hash
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price       NUMERIC(10, 2) NOT NULL,
  category    VARCHAR(50)  NOT NULL CHECK (category IN ('men', 'women', 'accessories')),
  image_url   VARCHAR(500),
  stock       INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity    INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_cart_items_user   ON cart_items(user_id);

-- Seed products
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
  ('Leather Jacket',  'Premium full-grain leather biker jacket', 250.00, 'men',         'images/men_jacket.jpg',  12),
  ('Casual Shirt',    'Relaxed-fit cotton Oxford shirt',         50.00,  'men',         'images/men_shirt.jpeg',  40),
  ('Stylish Shoes',   'Italian-crafted leather derby shoes',    120.00,  'men',         'images/men_shoes.jpg',   25),
  ('Luxury Watch',    'Swiss movement sapphire crystal watch',  300.00,  'men',         'images/men_watch.jpg',    8),
  ('Red Dress',       'Silk-blend evening dress in crimson',    120.00,  'women',       'images/dress.jpg',       18),
  ('Silk Blouse',     'Lightweight mulberry silk blouse',        80.00,  'women',       'images/blouse.webp',     30),
  ('Floral Skirt',    'Midi-length chiffon floral print skirt',  60.00,  'women',       'images/skirt.jpg',       35),
  ('Evening Gown',    'Floor-length embellished formal gown',   200.00,  'women',       'images/gown.webp',       10),
  ('Leather Handbag', 'Hand-stitched full-grain leather tote',  150.00,  'women',       'images/handbag.jpg',     20),
  ('Accessories Set', 'Curated accessories collection',          90.00,  'accessories', 'images/accessories.jpg', 15)
ON CONFLICT DO NOTHING;

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  subject    TEXT,
  message    TEXT NOT NULL,
  read       BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at DESC);
