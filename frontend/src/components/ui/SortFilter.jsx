function SortFilter({ sortValue = "-createdAt", onSortChange }) {
  return (
    <div className="max-w-md mx-auto mb-4">
      <label className="block text-gray-700 font-medium mb-1">Sort By</label>
      <select
        value={sortValue}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
      >
        <option value="-createdAt">Newest</option>
        <option value="createdAt">Oldest</option>
        <option value="price">Price: Low to High</option>
        <option value="-price">Price: High to Low</option>
        <option value="name">Name: A to Z</option>
        <option value="-name">Name: Z to A</option>
      </select>
    </div>
  );
}

export default SortFilter;