const pool = require('../db');

exports.searchProducts = async (req, res) => {
  const { name, category } = req.query;

  try {
    const query = 'SELECT * FROM products WHERE (name ILIKE $1 OR $1 IS NULL) AND (category ILIKE $2 OR $2 IS NULL)';
    const result = await pool.query(query, [`%${name}%`, `%${category}%`]);

    res.json({ products: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  const buyerId = req.user.userId;

  try {
    const result = await pool.query(
      'INSERT INTO carts (buyer_id, product_id) VALUES ($1, $2) RETURNING *',
      [buyerId, productId]
    );

    res.status(201).json({ message: 'Product added to cart', cart: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { id } = req.params;
  const buyerId = req.user.userId;

  try {
    const result = await pool.query('DELETE FROM carts WHERE id = $1 AND buyer_id = $2 RETURNING *', [id, buyerId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cart item not found or unauthorized' });
    }

    res.json({ message: 'Product removed from cart', cart: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
