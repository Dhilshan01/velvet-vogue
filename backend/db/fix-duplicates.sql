-- fix-duplicates.sql
-- Run this ONCE to clean up duplicate products caused by running schema.sql multiple times
-- Usage: psql -U postgres -d velvet_vogue -f backend/db/fix-duplicates.sql

-- Step 1: Remove duplicate rows, keeping only the earliest inserted one per name
DELETE FROM products
WHERE id NOT IN (
  SELECT DISTINCT ON (name) id
  FROM products
  ORDER BY name, created_at ASC
);

-- Step 2: Add the unique constraint on name so this can never happen again
-- (safe to run even if constraint already exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'products_name_key'
  ) THEN
    ALTER TABLE products ADD CONSTRAINT products_name_key UNIQUE (name);
  END IF;
END $$;

-- Step 3: Confirm result
SELECT name, category, price FROM products ORDER BY category, name;
