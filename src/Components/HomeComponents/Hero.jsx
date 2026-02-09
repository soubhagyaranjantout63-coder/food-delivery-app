import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">

        <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
          Revolutionize Your Food Experience
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
          Fast delivery. Fresh meals. Premium taste.
        </p>

        <Link
          to="/"
          className="mt-8 px-8 py-3 bg-orange-500 rounded-full text-lg font-medium shadow-lg hover:bg-orange-600 hover:scale-105 transition duration-300"
        >
          Order Now
        </Link>

      </div>
    </div>
  );
};

export default Hero;
