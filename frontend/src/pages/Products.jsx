import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import Pagination from "../components/ui/Pagination";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/common/Modal";
import ProductForm from "../components/products/ProductForm";
import Loader from "../components/common/Loader";
import {
  deleteProduct,
  getProductCategories,
  getProducts,
} from "../services/productService";

function Products() {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const [searchText, setSearchText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("-createdAt");
  const [editingProduct, setEditingProduct] = useState(null);

  // Load categories
  useEffect(() => {
    let ignore = false;

    const loadCategories = async () => {
      try {
        const data = await getProductCategories();
        if (!ignore) setCategories(data.categories || []);
      } catch {
        if (!ignore) setCategories([]);
      }
    };

    loadCategories();

    return () => {
      ignore = true;
    };
  }, []);

  // Load products
  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      const params = {
        page: currentPage,
        keyword,
        category,
        sort,
      };

      try {
        setLoading(true);
        setError("");

        const data = await getProducts(params);

        if (!ignore) {
          setProducts(data.products || []);
          setPages(data.totalPages || 1);
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error.response?.data?.message || "Failed to fetch products"
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      ignore = true;
    };
  }, [currentPage, keyword, category, sort, refreshKey]);

  // Search submit
  const applySearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setKeyword(searchText.trim());
  };

  // Clear filters
  const clearFilters = () => {
    setSearchText("");
    setKeyword("");
    setCategory("");
    setSort("-createdAt");
    setCurrentPage(1);
  };

  // Refresh
  const refreshProducts = () => {
    setRefreshKey((key) => key + 1);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteProduct(id);
      refreshProducts();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete product");
    }
  };

  // Generic filter handler
  const updateFilter = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Product List
      </h1>

      {isAdmin && (
        <div className="flex justify-center mb-4">
          <button
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            onClick={() => setEditingProduct({})}
          >
            Create Product
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="max-w-4xl mx-auto bg-white border rounded-lg p-4">
        <form
          onSubmit={applySearch}
          className="flex flex-col sm:flex-row gap-3 mb-4"
        >
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Search
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <select
            value={category}
            onChange={updateFilter(setCategory)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={updateFilter(setSort)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="-createdAt">Newest</option>
            <option value="createdAt">Oldest</option>
            <option value="price">Price Low to High</option>
            <option value="-price">Price High to Low</option>
            <option value="name">Name A to Z</option>
            <option value="-name">Name Z to A</option>
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="px-4 py-2 border bg-white hover:bg-gray-100 rounded-lg"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="mt-6 text-center">
          <Loader />
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 mt-6">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {products.length ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onEdit={() => setEditingProduct(product)}
                  onDelete={handleDelete}
                  canManage={isAdmin}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products available.
              </p>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={pages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Modal */}
      {editingProduct && (
        <Modal onClose={() => setEditingProduct(null)}>
          <ProductForm
            product={editingProduct}
            onSuccess={() => {
              setEditingProduct(null);
              refreshProducts();
            }}
            categories={categories}
          />
        </Modal>
      )}
    </div>
  );
}

export default Products;