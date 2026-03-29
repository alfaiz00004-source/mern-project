function PriceFilter({ minPrice = "", maxPrice = "", onPriceChange }) {
  return (
    <div className="max-w-md mx-auto mb-4 grid grid-cols-2 gap-3">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Min Price</label>
        <input
          type="number"
          min="0"
          value={minPrice}
          onChange={(e) => onPriceChange("min", e.target.value)}
          placeholder="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Max Price</label>
        <input
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => onPriceChange("max", e.target.value)}
          placeholder="1000"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default PriceFilter;