import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import SearchBar from "../components/ui/SearchBar";
import Pagination from "../components/ui/Pagination";
import { useProducts } from "../hooks/useProduct";
import { useDebounce } from "../hooks/useDebounce";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/common/Model";
import ProductForm from "../components/products/ProductForm";
import Loader from "../components/common/Loader";

// NEW: modular filters
import CategoryFilter from "../components/ui/CategoryFilter";
import SortFilter from "../components/ui/SortFilter";
import PriceFilter from "../components/ui/PriceFilter";

function Products() {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";
  const {
    products,
    pages,
    categories: categoryList,
    loading,
    error,
    fetchProducts,
    fetchCategories,
    deleteProductById,
  } = useProducts();

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState("-createdAt");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const debouncedSearch = useDebounce(searchValue, 400);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const params = {
      page: currentPage,
      keyword: debouncedSearch,
      category: selectedCategory,
      sort: sortValue,
    };
    if (minPrice) params.price_gte = Number(minPrice);
    if (maxPrice) params.price_lte = Number(maxPrice);
    fetchProducts(params);
  }, [
    currentPage,
    debouncedSearch,
    selectedCategory,
    sortValue,
    minPrice,
    maxPrice,
    fetchProducts,
  ]);

  const handleSearch = (e) => {
    if (e?.preventDefault) e.preventDefault();
    setCurrentPage(1);
    const params = {
      page: 1,
      keyword: searchValue,
      category: selectedCategory,
      sort: sortValue,
    };
    if (minPrice) params.price_gte = Number(minPrice);
    if (maxPrice) params.price_lte = Number(maxPrice);
    fetchProducts(params);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Product List
      </h1>

      {isAdmin && (
        <div className="flex justify-center mb-4">
          <button
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200"
            onClick={() => setEditingProduct({})}
          >
            Create Product
          </button>
        </div>
      )}

      <SearchBar
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
      />

      {/* ======== Modular Filters ======== */}

      <CategoryFilter
        categories={categoryList}
        selectedCategory={selectedCategory}
        onCategorySelect={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(1);
        }}
      />
      <SortFilter
        sortValue={sortValue}
        onSortChange={(val) => {
          setSortValue(val);
          setCurrentPage(1);
        }}
      />
      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChange={(type, val) => {
          type === "min" ? setMinPrice(val) : setMaxPrice(val);
          setCurrentPage(1);
        }}
      />

      {/* ======== Product List ======== */}
      {loading ? (
        <div className="mt-6">
          <Loader />
          <p className="text-center text-gray-500">Loading products...</p>
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
                  onDelete={async (id) => {
                    if (window.confirm("Are you sure?"))
                      await deleteProductById(id);
                  }}
                  canManage={isAdmin}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products available.
              </p>
            )}
          </div>
          {pages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={pages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {editingProduct && (
        <Modal onClose={() => setEditingProduct(null)}>
          <ProductForm
            product={editingProduct}
            onSuccess={() => {
              fetchProducts();
              setEditingProduct(null);
            }}
            categories={categoryList}
          />
        </Modal>
      )}
    </div>
  );
}

export default Products;
