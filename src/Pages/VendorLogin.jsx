import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorLogin = ({ setAuth }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailOrPhone: email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok && data.user.role === "vendor") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("auth", JSON.stringify(data.user));
      setAuth(data.user);
      navigate("/vendor-dashboard");
    } else {
      alert("Invalid Vendor Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-xl w-96 space-y-4"
      >
        <h2 className="text-2xl text-blue-500 font-bold text-center">
          Vendor Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-800 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-800 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default VendorLogin;
