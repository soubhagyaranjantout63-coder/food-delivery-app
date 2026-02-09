import React from "react";

const AdminAnalytics = () => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const revenue = orders.reduce((acc, o) => acc + o.total, 0);
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const pending = orders.filter(o => o.status !== "Delivered").length;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl mb-6">Analytics</h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2>Total Revenue</h2>
          <p className="text-2xl text-green-400">₹{revenue}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2>Delivered Orders</h2>
          <p className="text-2xl text-blue-400">{delivered}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2>Pending Orders</h2>
          <p className="text-2xl text-red-400">{pending}</p>
        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;