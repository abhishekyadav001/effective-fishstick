const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.verifyToken);

router.post('/add-product', sellerController.addProduct);
router.put('/edit-product/:id', sellerController.editProduct);
router.delete('/delete-product/:id', sellerController.deleteProduct);

module.exports = router;
