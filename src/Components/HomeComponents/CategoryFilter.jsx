import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-3 text-gray-100">
        Browse by Category
      </h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition
              ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white border-orange-500 shadow-md"
                  : "bg-gray-900/50 text-gray-200 border-gray-700 hover:bg-gray-800"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;