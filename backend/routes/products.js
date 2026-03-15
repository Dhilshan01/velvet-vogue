import { Router } from 'express';
import pool from '../db/pool.js';

const router = Router();

// GET /api/products  — optional ?category=men|women|accessories
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category
      ? { text: 'SELECT * FROM products WHERE category = $1 ORDER BY name', values: [category] }
      : { text: 'SELECT * FROM products ORDER BY category, name' };
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch products' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch product' });
  }
});

export default router;
