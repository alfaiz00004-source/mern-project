import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import {
  createProduct,
  updateProduct,
} from "../../services/productService";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  category: "",
};

function ProductForm({ product = {}, onSuccess, categories = [] }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (product?._id) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        category: product.category || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [product]);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validate = () => {
    const nextErrors = {};
    const price = Number(form.price);

    if (!form.name.trim()) nextErrors.name = "Product name is required";
    if (!form.description.trim()) nextErrors.description = "Description is required";
    if (!form.category.trim()) nextErrors.category = "Category is required";
    if (Number.isNaN(price) || price <= 0) {
      nextErrors.price = "Price must be greater than 0";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!validate()) return;

    const payload = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      category: form.category,
    };

    try {
      setLoading(true);
      const savedProduct = product?._id
        ? await updateProduct(product._id, payload)
        : await createProduct(payload);

      if (onSuccess) {
        onSuccess(savedProduct);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Product save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {product?._id ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={updateField}
            placeholder="Enter product name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={updateField}
            placeholder="Enter price"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={updateField}
            placeholder="Enter description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={updateField}
            list="product-categories"
            placeholder="Enter category"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <datalist id="product-categories">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {message && <p className="text-red-500 text-center">{message}</p>}
        {loading && <Loader variant="inline" />}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Saving..." : product?._id ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
