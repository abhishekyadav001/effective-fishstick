const express = require("express");
const router = express.Router();
const buyerController = require("../controllers/buyerController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware.verifyToken);

router.get("/search", buyerController.searchProducts);
router.post("/add-to-cart", buyerController.addToCart);
router.delete("/remove-from-cart/:id", buyerController.removeFromCart);

module.exports = router;
