import React from "react";

const services = [
  {
    title: "Fast Delivery",
    desc: "Get your food delivered within 30 minutes.",
    icon: "🚀"
  },
  {
    title: "Fresh Ingredients",
    desc: "We use only high quality fresh ingredients.",
    icon: "🥗"
  },
  {
    title: "Best Chefs",
    desc: "Top rated chefs preparing your meals.",
    icon: "👨‍🍳"
  },
  {
    title: "24/7 Support",
    desc: "Customer support available anytime.",
    icon: "📞"
  }
];

const Services = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen">

      {/* HERO */}
      <div className="text-center py-20 bg-gradient-to-r from-orange-600 to-orange-500">
        <h1 className="text-4xl font-bold mb-4">
          Our Premium Services
        </h1>
        <p className="text-lg opacity-90">
          We provide quality experience with every order.
        </p>
      </div>

      {/* SERVICE CARDS */}
      <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">

        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-orange-500/30 hover:-translate-y-2 transition duration-300"
          >
            <div className="text-5xl mb-4">
              {service.icon}
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              {service.title}
            </h3>

            <p className="text-gray-400">
              {service.desc}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Services;
