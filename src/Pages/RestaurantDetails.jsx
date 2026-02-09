import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RestaurantDetails() {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/foods/${id}`)
      .then(res => res.json())
      .then(data => setFoods(data));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-3xl font-bold mb-6">
        🍔 Food Items
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={food.image}
              alt={food.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold">{food.name}</h3>
              <p className="text-gray-600 mt-1">₹{food.price}</p>

              <button className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default RestaurantDetails;
