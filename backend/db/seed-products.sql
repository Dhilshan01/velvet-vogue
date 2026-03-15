-- =============================================================
--  Velvet Vogue — 20 Products with Unique Unsplash Images
--  Run: psql -U postgres -d velvet_vogue -f backend/db/seed-products.sql
-- =============================================================

DELETE FROM cart_items;
DELETE FROM products;

INSERT INTO products (name, description, price, category, image_url, stock) VALUES

  -- ── Men (10) ───────────────────────────────────────────────

  ('Leather Biker Jacket',
   'Full-grain cowhide leather jacket with quilted lining and antique brass hardware.',
   289.00, 'men',
   'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
   14),

  ('Oxford Button-Down Shirt',
   'Classic slim-fit Oxford weave cotton shirt, perfect for smart-casual occasions.',
   65.00, 'men',
   'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
   50),

  ('Derby Leather Shoes',
   'Hand-stitched full-grain leather derby shoes with leather sole and rubber heel.',
   145.00, 'men',
   'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
   30),

  ('Chronograph Watch',
   'Swiss-movement chronograph with sapphire crystal glass and stainless steel bracelet.',
   320.00, 'men',
   'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
   9),

  ('Slim Fit Chinos',
   'Stretch-cotton slim-fit chinos in versatile mid-stone wash. Tapered leg.',
   85.00, 'men',
   'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
   40),

  ('Merino Wool Sweater',
   'Lightweight merino wool crewneck sweater. Naturally temperature-regulating.',
   110.00, 'men',
   'https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=600&q=80',
   25),

  ('Tailored Wool Blazer',
   'Single-breasted wool-blend blazer with notched lapels and interior pocket.',
   220.00, 'men',
   'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
   18),

  ('Linen Casual Shirt',
   'Relaxed-fit 100% linen shirt with subtle texture. Ideal for warm weather.',
   72.00, 'men',
   'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80',
   35),

  ('Suede Chelsea Boots',
   'Pull-on suede Chelsea boots with elastic side panels and stacked leather heel.',
   195.00, 'men',
   'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80',
   20),

  ('Slim Leather Wallet',
   'Full-grain leather bifold wallet with 6 card slots and a note compartment.',
   55.00, 'men',
   'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
   60),

  -- ── Women (10) ─────────────────────────────────────────────

  ('Crimson Silk Dress',
   'Floor-length silk-blend evening dress in deep crimson with a draped neckline.',
   135.00, 'women',
   'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
   20),

  ('Mulberry Silk Blouse',
   'Lightweight 100% mulberry silk blouse with pearl buttons and relaxed silhouette.',
   95.00, 'women',
   'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80',
   28),

  ('Chiffon Floral Skirt',
   'Midi-length chiffon skirt with a delicate floral print and elasticated waist.',
   68.00, 'women',
   'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80',
   38),

  ('Embellished Evening Gown',
   'Floor-length gown with hand-sewn crystal embellishments on the bodice.',
   245.00, 'women',
   'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80',
   8),

  ('Structured Leather Tote',
   'Hand-stitched full-grain leather tote with gold-tone hardware and zip pocket.',
   165.00, 'women',
   'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
   22),

  ('Linen Wrap Dress',
   'Relaxed wrap-style dress in breathable European linen. Adjustable tie waist.',
   115.00, 'women',
   'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
   30),

  ('Cashmere Turtleneck',
   'Grade-A cashmere turtleneck in slim silhouette. Exceptionally soft and warm.',
   185.00, 'women',
   'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
   16),

  ('Pleated Satin Skirt',
   'Satin-finish pleated midi skirt with high waistband. Falls beautifully in motion.',
   88.00, 'women',
   'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80',
   24),

  ('Velvet Mini Dress',
   'Stretch-velvet short dress with square neckline and puff sleeves.',
   125.00, 'women',
   'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80',
   15),

  ('Crossbody Saddle Bag',
   'Compact pebbled leather crossbody bag with adjustable strap and turn-lock closure.',
   138.00, 'women',
   'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&q=80',
   18)

ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  price       = EXCLUDED.price,
  category    = EXCLUDED.category,
  image_url   = EXCLUDED.image_url,
  stock       = EXCLUDED.stock;

-- Confirm result
SELECT
  ROW_NUMBER() OVER (ORDER BY category, name) AS "#",
  name,
  category,
  price,
  stock
FROM products
ORDER BY category, name;
