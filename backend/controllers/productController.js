const Product = require('../models/productModel');

const PRODUCT_LIMIT = 10;

const serverError = (res, error) => {
  res.status(500).json({ message: error.message || 'Server error' });
};

const buildProductFilter = (query) => {
  const filter = {};
  const keyword = String(query.keyword || '').trim();
  const category = String(query.category || '').trim();
  const minPrice = query.price_gte === undefined || query.price_gte === ''
    ? null
    : Number(query.price_gte);
  const maxPrice = query.price_lte === undefined || query.price_lte === ''
    ? null
    : Number(query.price_lte);

  if (keyword) {
    filter.name = { $regex: keyword, $options: 'i' };
  }

  if (category) {
    filter.category = category;
  }

  const hasMinPrice = minPrice !== null && !Number.isNaN(minPrice);
  const hasMaxPrice = maxPrice !== null && !Number.isNaN(maxPrice);

  if (hasMinPrice || hasMaxPrice) {
    filter.price = {};

    if (hasMinPrice) {
      filter.price.$gte = minPrice;
    }

    if (hasMaxPrice) {
      filter.price.$lte = maxPrice;
    }
  }

  return filter;
};

const getSortValue = (sort) => {
  const allowedSorts = ['-createdAt', 'createdAt', 'price', '-price', 'name', '-name'];
  return allowedSorts.includes(sort) ? sort : '-createdAt';
};

const getProductData = (body, isUpdate = false) => {
  const data = {};

  if (!isUpdate || body.name !== undefined) {
    const name = String(body.name || '').trim();
    if (!name) return { error: 'Name is required' };
    data.name = name;
  }

  if (!isUpdate || body.price !== undefined) {
    const price = Number(body.price);
    if (Number.isNaN(price) || price <= 0) {
      return { error: 'Price must be greater than 0' };
    }
    data.price = price;
  }

  if (!isUpdate || body.description !== undefined) {
    const description = String(body.description || '').trim();
    if (!description) return { error: 'Description is required' };
    data.description = description;
  }

  if (!isUpdate || body.category !== undefined) {
    const category = String(body.category || '').trim();
    if (!category) return { error: 'Category is required' };
    data.category = category;
  }

  return { data };
};

const getProductCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    return res.json({ categories });
  } catch (error) {
    return serverError(res, error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { data, error } = getProductData(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const product = await Product.create(data);
    return res.status(201).json(product);
  } catch (error) {
    return serverError(res, error);
  }
};

const getProducts = async (req, res) => {
  try {
    const currentPage = Math.max(Number(req.query.page) || 1, 1);
    const skip = PRODUCT_LIMIT * (currentPage - 1);
    const filter = buildProductFilter(req.query);
    const sort = getSortValue(req.query.sort);

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(PRODUCT_LIMIT);

    return res.json({
      success: true,
      count: products.length,
      total,
      currentPage,
      totalPages: Math.max(1, Math.ceil(total / PRODUCT_LIMIT)),
      products,
    });
  } catch (error) {
    return serverError(res, error);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Product not found' });
    }

    return serverError(res, error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { data, error } = getProductData(req.body, true);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Product not found' });
    }

    return serverError(res, error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    return res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Product not found' });
    }

    return serverError(res, error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductCategories,
  getProductById,
  updateProduct,
  deleteProduct,
};
