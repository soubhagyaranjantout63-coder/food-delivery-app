import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setAuth }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // simple demo check
    if (email === "admin@gmail.com" && password === "1234") {

      // ✅ YAHI PAR AUTH SET HOGA
      localStorage.setItem("auth", JSON.stringify({ role: "admin" }));
      setAuth({ role: "admin" });

      navigate("/admin-dashboard");

    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-800"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-800"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 py-2 rounded"
        >
          Login
        </button>

      </form>
    </div>
  );
};

export default AdminLogin;