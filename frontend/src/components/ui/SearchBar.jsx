function SearchBar({ value = "", onChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(e);
    }
  };

  return (
    <div className="flex items-center max-w-md mx-auto mb-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg transition duration-200"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;