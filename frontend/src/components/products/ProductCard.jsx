const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="20" fill="#6b7280">
        No Image
      </text>
    </svg>`
  );

function ProductCard({ product, onEdit, onDelete, deleting = false, canManage = false }) {
  const handleDelete = () => {
    if (!onDelete) return;
    const id = product?._id || product?.id;
    onDelete(id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={product?.image || FALLBACK_IMAGE}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        <p className="text-indigo-600 font-bold text-lg">${product.price}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 px-4 pb-4">
        {canManage && onEdit && (
          <button
            onClick={() => onEdit(product)}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition duration-200"
          >
            Edit
          </button>
        )}
        {canManage && onDelete && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition duration-200 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
