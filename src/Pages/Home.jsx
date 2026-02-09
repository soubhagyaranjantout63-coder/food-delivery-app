import React, { useEffect, useState, useRef } from "react";
import { useCart } from "../context/CartContext";

function Home() {
  const { addToCart } = useCart();
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")));

  const exploreRef = useRef(null);

  /* ================= FETCH ================= */
  const fetchItems = async () => {
    const res = await fetch("http://localhost:5000/api/foods");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const categories = ["All", "Pizza", "Burger", "Pasta", "Indian", "Chinese"];

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-gray-950 text-white min-h-screen">

      {/* ================= HERO SECTION ================= */}
      <div
        className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Delicious Food Delivered Fast 🚀
          </h1>

          <p className="text-gray-300 mb-8 text-lg">
            Order your favourite meals anytime
          </p>

          <button
            onClick={() =>
              exploreRef.current.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-orange-500 px-8 py-3 rounded-lg text-lg hover:bg-orange-600 transition shadow-lg hover:scale-105"
          >
            Explore Menu
          </button>
        </div>
      </div>

      {/* ================= CATEGORY ================= */}
      <div ref={exploreRef} className="max-w-7xl mx-auto px-8 mt-16">
        <h2 className="text-3xl font-bold mb-6 text-orange-500">
          Browse by Category
        </h2>

        <div className="flex gap-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full transition ${
                selectedCategory === cat
                  ? "bg-orange-500"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================= ITEMS ================= */}
      <div className="max-w-7xl mx-auto px-8 mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-orange-500/20 transition transform hover:-translate-y-2 duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-400 mt-2 text-sm">
                {item.description}
              </p>

              <div className="flex justify-between items-center mt-5">
                <span className="text-orange-400 font-bold text-lg">
                  ₹{item.price}
                </span>

                {/* USER */}
                {auth?.role === "user" && (
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    Add to Cart
                  </button>
                )}

                {/* ADMIN */}
                {auth?.role === "admin" && (
                  <div className="flex gap-2">
                    <button className="bg-blue-600 px-3 py-1 rounded">
                      Edit
                    </button>
                    <button className="bg-red-600 px-3 py-1 rounded">
                      Delete
                    </button>
                  </div>
                )}

                {/* VENDOR (OWN ITEM ONLY) */}
                {auth?.role === "vendor" &&
                  item.vendor === auth.id && (
                    <div className="flex gap-2">
                      <button className="bg-blue-600 px-3 py-1 rounded">
                        Edit
                      </button>
                      <button className="bg-red-600 px-3 py-1 rounded">
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;
