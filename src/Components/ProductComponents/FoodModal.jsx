import React, { useEffect } from "react";

const FoodModal = ({ food, onClose }) => {
  // Close on Esc key
  useEffect(() => {
    if (!food) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [food, onClose]);

  if (!food) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-2xl shadow-xl max-w-md w-[90%] border border-gray-800"
        onClick={(e) => e.stopPropagation()} // prevent close on inner click
      >
        <div className="relative">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-52 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          <h3 className="text-2xl font-semibold text-white">{food.name}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
            <span className="px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-xs">
              {food.category}
            </span>
            <span>• ⭐ {food.rating}</span>
            <span>• {food.prepTime}</span>
          </div>

          <p className="mt-3 text-sm text-gray-300">{food.description}</p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-xl font-bold text-orange-400">
              ₹{food.price}
            </span>
            <button
              className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition"
              onClick={() => alert(`Added ${food.name} to cart (demo)`)}
            >
              Add to Cart
            </button>
          </div>

          <p className="mt-2 text-[11px] text-gray-500">
            * This is just a demo modal. Integrate with your cart logic here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodModal;