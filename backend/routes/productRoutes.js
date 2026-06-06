const express = require('express');
const {
  createProduct,
  getProducts,
  getProductCategories,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getProductCategories);
router.get('/:id', getProductById);

router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
