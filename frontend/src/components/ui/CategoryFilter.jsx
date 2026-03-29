function CategoryFilter({ categories = [], selectedCategory = "", onCategorySelect }) {
  return (
    <div className="flex flex-wrap gap-2 max-w-md mx-auto mb-4">
      {/* All button */}
      <button
        onClick={() => onCategorySelect("")}
        className={`px-4 py-2 rounded-lg border transition duration-200 ${
          selectedCategory === ""
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`px-4 py-2 rounded-lg border transition duration-200 ${
            selectedCategory === category
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;