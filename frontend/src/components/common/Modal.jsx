function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-xl w-full">
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          X
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
