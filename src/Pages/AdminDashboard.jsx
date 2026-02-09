import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeSection, setActiveSection] = useState("orders");
  const [orderFilter, setOrderFilter] = useState("All");

  /* ================= FETCH DATA ================= */
  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/admin/orders");
    const data = await res.json();
    if (Array.isArray(data)) setOrders(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/admin/users");
    const data = await res.json();
    if (Array.isArray(data)) setUsers(data);
  };

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

  /* ================= FILTER ORDERS ================= */
  const filteredOrders =
    orderFilter === "All"
      ? orders
      : orders.filter((o) => o.status === orderFilter);

  /* ================= UPDATE ORDER ================= */
  const updateStatus = async (id, status) => {
    let next = "Preparing";
    if (status === "Preparing") next = "Out for Delivery";
    if (status === "Out for Delivery") next = "Delivered";

    await fetch(`http://localhost:5000/api/admin/update-status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });

    fetchOrders();
  };

  /* ================= REMOVE USER ================= */
  const removeUser = async (id) => {
    await fetch(`http://localhost:5000/api/admin/delete-user/${id}`, {
      method: "DELETE",
    });

    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">

      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-black p-6 border-r border-gray-800">
        <h1 className="text-2xl font-bold text-orange-500 mb-8">
          Admin Panel
        </h1>

        <button
          onClick={() => setActiveSection("orders")}
          className={`block w-full text-left px-4 py-3 rounded-lg mb-3 transition ${
            activeSection === "orders"
              ? "bg-orange-500"
              : "hover:bg-gray-800"
          }`}
        >
          📦 Orders
        </button>

        <button
          onClick={() => setActiveSection("users")}
          className={`block w-full text-left px-4 py-3 rounded-lg transition ${
            activeSection === "users"
              ? "bg-orange-500"
              : "hover:bg-gray-800"
          }`}
        >
          👥 Users
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-10">

        {/* ================= TOP CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div
            onClick={() => setActiveSection("orders")}
            className="bg-gray-800 p-6 rounded-xl cursor-pointer hover:scale-105 transition"
          >
            <h3 className="text-gray-400">Total Orders</h3>
            <p className="text-3xl font-bold text-orange-400">
              {orders.length}
            </p>
          </div>

          <div
            onClick={() => setActiveSection("users")}
            className="bg-gray-800 p-6 rounded-xl cursor-pointer hover:scale-105 transition"
          >
            <h3 className="text-gray-400">Total Users</h3>
            <p className="text-3xl font-bold text-orange-400">
              {users.length}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-gray-400">Revenue</h3>
            <p className="text-3xl font-bold text-orange-400">
              ₹
              {orders.reduce(
                (sum, order) => sum + (order.totalAmount || 0),
                0
              )}
            </p>
          </div>
        </div>

        {/* ================= ORDERS SECTION ================= */}
        {activeSection === "orders" && (
          <>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">
              Orders
            </h2>

            {/* FILTER BUTTONS */}
            <div className="flex gap-4 mb-6">
              {["All", "Preparing", "Delivered"].map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderFilter(status)}
                  className={`px-4 py-2 rounded-lg ${
                    orderFilter === status
                      ? "bg-orange-500"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-800 p-5 rounded-xl flex justify-between items-center hover:bg-gray-700 transition"
                >
                  <div>
                    <p className="text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p>Total: ₹{order.totalAmount}</p>
                    <p>Status: {order.status}</p>
                  </div>

                  {order.status !== "Delivered" && (
                    <button
                      onClick={() =>
                        updateStatus(order._id, order.status)
                      }
                      className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                    >
                      Update
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= USERS SECTION ================= */}
        {activeSection === "users" && (
          <>
            <h2 className="text-2xl font-semibold text-orange-400 mb-6">
              Users
            </h2>

            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-gray-800 p-5 rounded-xl flex justify-between items-center hover:bg-gray-700 transition"
                >
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-gray-400">{user.email}</p>
                    <p className="text-gray-400">{user.phone}</p>
                  </div>

                  <button
                    onClick={() => removeUser(user._id)}
                    className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
