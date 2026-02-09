import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddItem = ({ onAdd }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    rating: "",
    prepTime: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!onAdd) {
      alert("Add function not found");
      return;
    }

    const newItem = {
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating)
    };

    onAdd(newItem);

    alert("Item Added Successfully ✅");

    navigate("/admin-dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-orange-500">
          Add New Item
        </h2>

        <input name="name" placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800 rounded" />

        <input name="category" placeholder="Category"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800 rounded" />

        <input name="price" placeholder="Price"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800 rounded" />

        <input name="rating" placeholder="Rating"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800 rounded" />

        <input name="prepTime" placeholder="Prep Time"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800 rounded" />

        <textarea name="description" placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800 rounded" />

        <input name="image" placeholder="Image URL"
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-gray-800 rounded" />

        <button
          type="submit"
          className="w-full bg-orange-500 py-2 rounded"
        >
          Add Item
        </button>


      </form>
    </div>
  );
};

export default AddItem;