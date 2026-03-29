import { useState, useCallback } from "react";

import {
  getProducts,
  getProductCategories,
  createProduct as createProductApi,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi,
} from "../services/productService";

import { handleRequest } from "../utils/handleRequest";

export const useProducts = () => {
  // STATE
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔥 HOF (memoized)
  const withRequest = useCallback((request, onSuccess, errorMessage) => {
    return handleRequest({
      request,
      setLoading,
      setError,
      errorMessage,
      onSuccess,
    });
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = useCallback((params = {}) =>
    withRequest(
      () => getProducts({ page: 1, ...params }),
      (data) => {
        setProducts(data.products || []);
        setPages(data.totalPages || 1);
      },
      "Failed to fetch products"
    ),
  [withRequest]);

  // FETCH CATEGORIES
  const fetchCategories = useCallback(() =>
    withRequest(
      () => getProductCategories(),
      (data) => setCategories(data.categories || []),
      "Failed to fetch categories"
    ),
  [withRequest]);

  // CREATE PRODUCT
  const createProduct = useCallback((payload) =>
    withRequest(
      () => createProductApi(payload),
      (res) => {
        const newProduct = res?.product || res;
        setProducts((prev) => [newProduct, ...prev]);
      },
      "Failed to create product"
    ),
  [withRequest]);

  // UPDATE PRODUCT
  const updateProductById = useCallback((id, payload) =>
    withRequest(
      () => updateProductApi(id, payload),
      (res) => {
        const updatedProduct = res?.product || res;
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? updatedProduct : p))
        );
      },
      "Failed to update product"
    ),
  [withRequest]);

  // DELETE PRODUCT
  const deleteProductById = useCallback((id) =>
    withRequest(
      () => deleteProductApi(id),
      () => {
        setProducts((prev) =>
          prev.filter((p) => p._id !== id)
        );
      },
      "Failed to delete product"
    ),
  [withRequest]);

  return {
    products,
    pages,
    categories,
    loading,
    error,

    fetchProducts,
    fetchCategories,
    createProduct,
    updateProductById,
    deleteProductById,
  };
};