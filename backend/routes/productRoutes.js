const express = require('express');
const router = express.Router();
const {createProduct,getProducts, getProductCategories, getProductById, updateProduct, deleteProduct} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const {admin} = require('../middleware/adminMiddleware');
const {createProductValidation,updateProductValidation} = require('../validators/productValidators');
const validate = require('../middleware/validateMiddleware');


// CREATE ROUTES
router.post('/',protect,admin,createProductValidation,validate,createProduct);

// GET ALL PRODUCTS
router.get('/',getProducts);

// GET PRODUCT CATEGORIES
router.get('/categories', getProductCategories);

// GET SINGLE PRODUCT
router.get('/:id',getProductById);

// UPDATE PRODUCT
router.put('/:id',protect,admin,updateProductValidation,validate,updateProduct);

// DELETE PRODUCT
router.delete('/:id',protect,admin,deleteProduct);

module.exports = router;
