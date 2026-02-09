import React from "react";

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl text-blue-500 font-bold mb-8">
        Vendor Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">My Products</h2>
          <p>Manage your food items</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p>Track incoming orders</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Earnings</h2>
          <p>View your revenue</p>
        </div>

      </div>
    </div>
  );
};

export default VendorDashboard;
