import api from "./api";

export const getProductCategories = async () => {
  const { data } = await api.get("/products/categories");
  return data;
};

export const getProducts = async (filters = {}) => {
  const { data } = await api.get("/products", { params: filters });
  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProduct = async (productData) => {
  const { data } = await api.post("/products", productData);
  return data;
};

export const updateProduct = async (id, updates) => {
  const { data } = await api.put(`/products/${id}`, updates);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
