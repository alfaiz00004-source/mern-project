const Product = require('../models/productModel');

const asyncHandler = require('../utils/asyncHandler');
const APIFeatures = require('../utils/apiFeatures');

// GET PRODUCT CATEGORIES
const getProductCategories = asyncHandler(async (req, res) => {
    const categories = await Product.distinct('category');
    res.json({ categories });
});


//create product
const createProduct = asyncHandler(async(req ,res) => {
    const {name,price,description,category} = req.body;
    const product = await Product.create({
        name,
        price,
        description,
        category,
    });
    res.status(201).json(product);

})

//GET ALL PRODUCT
const getProducts = asyncHandler(async(req ,res)=> {
    const resultPerPage = 10;
    const productsCount = await Product.countDocuments(); //count for total pages

    const apiFeatures = new APIFeatures(Product.find(),req.query)
    .search()
    .filter()
    .sort()
    .pagination(resultPerPage);

    const products = await apiFeatures.query;

    res.json({
      success: true,

      count: products.length,
      // current page me kitne products return hue

      total: productsCount,
      // total products DB me

      currentPage: Number(req.query.page) || 1,
      // current page number (default 1)

      totalPages: Math.ceil(productsCount / resultPerPage),
      // total pages = total / perPage

      products
      // actual data

    });

})

//GET PRODUCT BY ID
const getProductById = asyncHandler(async(req , res)=> {
    const product = await Product.findById(req.params.id);
    if(!product) {
        res.status(404);
        throw new Error('Product not found');
    }
    res.json(product);

})

// UPDATE PRODUCT
const updateProduct = asyncHandler(async(req,res) => {
    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
    });
    if(!product) {
        res.status(404);
        throw new Error('Product not found');
    }
    const {name,price,description,category} = req.body;
    if(name) {
        product.name = name;
    }
    if(price) {
        product.price = price;
    }
    if(description) {
        product.description = description;
    }
    if(category) {
        product.category = category;
    }
    const updatedProduct = await product.save();
    res.json(updatedProduct);
});

//DELETE PRODUCT
const deleteProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(404);
        throw new Error('Product not found');
    }
    await product.deleteOne();
    res.json({message: 'Product deleted successfully'});

});

module.exports = {createProduct, getProducts, getProductCategories, getProductById, updateProduct, deleteProduct};
