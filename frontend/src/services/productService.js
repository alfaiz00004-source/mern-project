import api from "./api";

// GET PRODUCT CATEGORIES
export const getProductCategories = () => api.get("/products/categories");

// GET PRODUCTS
export const getProducts = (filters = {}) => {
  return api.get("/products", {
    params: filters
  });
};

// GET PRODUCT BY ID
export const getProductById = (id) => api.get(`/products/${id}`);

// CREATE PRODUCT
export const createProduct = (productData) =>
  api.post("/products", productData);

// UPDATE PRODUCT
export const updateProduct = (id, updates) =>
  api.put(`/products/${id}`, updates);

// DELETE PRODUCT
export const deleteProduct = (id) => api.delete(`/products/${id}`);
