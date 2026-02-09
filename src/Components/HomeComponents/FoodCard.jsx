import React from "react";

const FoodCard = ({ food, onAddToCart, onDelete, auth }) => {

  const renderStars = () => {
    const stars = [];
    const rating = Math.round(food.rating || 4);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`transition-all duration-300 ${
            i <= rating
              ? "text-yellow-400 scale-110"
              : "text-gray-500"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className=" relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10
                    transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/40">

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-52 object-cover transition-transform duration-700 hover:scale-110"
        />

        <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full shadow-lg text-sm font-bold">
          ₹{food.price}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 bg-gradient-to-b from-transparent to-black/70 backdrop-blur-md">

        <h3 className="text-xl font-bold text-white mb-1">
          {food.name}
        </h3>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {food.description}
        </p>

        {/* RATING */}
        <div className="flex items-center gap-1 mb-4 text-lg">
          {renderStars()}
          <span className="text-gray-400 text-sm ml-2">
            {food.rating || 4.2}
          </span>
        </div>

        {/* BUTTON SECTION */}

        {/* USER BUTTON */}
        {auth?.role === "user" && (
          <button
            onClick={() => onAddToCart(food)}
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 py-2 rounded-lg font-semibold shadow-md hover:shadow-orange-400/50"
          >
            Add to Cart
          </button>
        )}

        {/* ADMIN BUTTONS */}
        {auth?.role === "admin" && (
          <div className="flex gap-2">
            <button
              onClick={() => onDelete(food._id)}
              className="w-full bg-red-500 hover:bg-red-600 transition-all duration-300 py-2 rounded-lg font-semibold shadow-md hover:shadow-red-400/50"
            >
              Delete
            </button>

            <button
              className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 py-2 rounded-lg font-semibold shadow-md hover:shadow-blue-400/50"
            >
              Edit
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default FoodCard;
