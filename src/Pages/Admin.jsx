import { useState, useEffect } from "react";

function Admin() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/items")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      <h1 className="text-3xl font-bold mb-6 text-orange-500">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Items Card */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg text-gray-400">Total Items</h2>
          <p className="text-3xl font-bold mt-2">
            {items.length}
          </p>
        </div>

        {/* Revenue Card (dummy for now) */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg text-gray-400">Total Revenue</h2>
          <p className="text-3xl font-bold mt-2">
            ₹12,500
          </p>
        </div>

        {/* Orders Card */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg text-gray-400">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">
            24
          </p>
        </div>

      </div>

      {/* Items Table */}
      <div className="mt-10 bg-gray-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Manage Items
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="pb-3">Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map(item => (
              <tr key={item._id} className="border-b border-gray-800">
                <td className="py-3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                </td>
                <td>{item.name}</td>
                <td className="text-orange-400">
                  ₹{item.price}
                </td>
                <td>
                  <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Admin;