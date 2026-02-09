import React from "react";
import FoodCard from "./FoodCard";

const FoodGrid = ({ foods, onAddToCart, onDelete, auth }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {foods.map((food) => (
          <FoodCard
          key={food._id}  
          food={food}
          auth={auth}
          onAddToCart={onAddToCart}
          onDelete={() => onDelete(food._id)}  
          />
          ))}
      </div>
    </div>
  );
};

export default FoodGrid;
