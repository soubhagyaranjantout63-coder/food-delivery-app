import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);

    const interval = setInterval(() => {
      const updated = saved.map(order => {
        if (order.progress < 100) {
          order.progress += 20;

          if (order.progress >= 100) {
            order.status = "Delivered";
            order.progress = 100;
          } else if (order.progress >= 60) {
            order.status = "Out for Delivery";
          } else if (order.progress >= 30) {
            order.status = "Preparing";
          }
        }
        return order;
      });

      localStorage.setItem("orders", JSON.stringify(updated));
      setOrders(updated);

    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-3xl mb-8 font-bold">Live Delivery Tracking 🚚</h1>

      {orders.map(order => (
        <div key={order.id} className="bg-gray-800 p-6 mb-8 rounded-xl shadow-lg">

          <p className="mb-2">Date: {order.date}</p>
          <p>Status: <span className="text-orange-400">{order.status}</span></p>
          <p>Total: ₹{order.total}</p>

          {/* Progress Bar Container */}
          <div className="relative mt-6">

            {/* Background Line */}
            <div className="w-full h-3 bg-gray-600 rounded-full"></div>

            {/* Green Progress */}
            <div
              className="absolute top-0 h-3 bg-green-500 rounded-full transition-all duration-1000"
              style={{ width: `${order.progress}%` }}
            ></div>

            {/* 🚚 Moving Truck */}
            <div
              className="absolute -top-5 text-2xl transition-all duration-1000"
              style={{ left: `${order.progress}%` }}
            >
              🚚
            </div>

          </div>

          {order.status === "Delivered" && (
            <p className="mt-4 text-green-400 font-semibold animate-pulse">
              🎉 Order Delivered Successfully!
            </p>
          )}

        </div>
      ))}

    </div>
  );
};

export default Orders;