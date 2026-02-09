import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Navbar = ({ auth, setAuth }) => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const { cart } = useCart();

  // Sync auth on refresh
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, [setAuth]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    setAuth(null);
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 bg-black text-white shadow-lg px-10 py-4 flex items-center justify-between">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-10">

        <Link
          to="/"
          className="text-2xl font-bold text-orange-500 hover:scale-105 transition"
        >
          FoodHub
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-orange-400 transition">Home</Link>
          <Link to="/services" className="hover:text-orange-400 transition">Services</Link>
          <Link to="/contact" className="hover:text-orange-400 transition">Contact</Link>
        </div>

      </div>

      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center bg-gray-900 px-4 py-2 rounded-full w-1/3 shadow-inner">
        <input
          type="text"
          placeholder="Search food..."
          className="bg-transparent outline-none flex-1 text-sm"
        />
        <span className="text-orange-400">🔍</span>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* CART → Only User */}
        {auth?.role === "user" && (
          <Link to="/cart" className="relative text-xl hover:scale-110 transition">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-orange-500 text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        )}

        {/* PROFILE DROPDOWN */}
        {auth ? (
          <div className="relative">

            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center gap-2 hover:text-orange-400 transition"
            >
              👤 {auth?.name}
            </button>

            {dropdown && (
              <div className="absolute right-0 mt-3 w-52 bg-gray-900 rounded-xl shadow-xl p-3 border border-gray-700">

                {auth.role === "user" && (
                  <>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 hover:bg-gray-800 rounded"
                      onClick={() => setDropdown(false)}
                    >
                      My Profile
                    </Link>

                    <Link
                      to="/orders"
                      className="block px-3 py-2 hover:bg-gray-800 rounded"
                      onClick={() => setDropdown(false)}
                    >
                      My Orders
                    </Link>
                  </>
                )}

                {auth.role === "vendor" && (
                  <Link
                    to="/vendor-dashboard"
                    className="block px-3 py-2 hover:bg-gray-800 rounded"
                    onClick={() => setDropdown(false)}
                  >
                    Vendor Dashboard
                  </Link>
                )}

                {auth.role === "admin" && (
                  <Link
                    to="/admin-dashboard"
                    className="block px-3 py-2 hover:bg-gray-800 rounded"
                    onClick={() => setDropdown(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}

                <div className="border-t border-gray-700 my-2"></div>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-800 rounded text-red-400"
                >
                  Logout
                </button>

              </div>
            )}

          </div>
        ) : (
          /* NOT LOGGED IN */
          <div className="flex items-center gap-4">

            <Link
              to="/user-login"
              className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition shadow-md"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition shadow-md"
            >
              Signup
            </Link>

            <Link
              to="/vendor-login"
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Vendor
            </Link>

            <Link
              to="/admin-login"
              className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition shadow-md"
            >
              Admin
            </Link>

          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;
