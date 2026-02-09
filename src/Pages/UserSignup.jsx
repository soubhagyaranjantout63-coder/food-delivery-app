import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserSignup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    shopName: "",
    gst: "",
    address: "",
  });

  const [strength, setStrength] = useState(0);

  const checkStrength = (pass) => {
    let score = 0;
    if (pass.length > 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    setStrength(score);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      checkStrength(e.target.value);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const bodyData = { ...form, role };

    if (role === "vendor") {
      bodyData.isVerified = false;
    }

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    const data = await res.json();

    if (res.ok) {
      alert(
        role === "vendor"
          ? "Vendor account created. Waiting for admin approval."
          : "Signup successful!"
      );
      navigate("/verify-otp", { state: { email: form.email } });
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-gray-900 px-4">

      <div className="w-full max-w-sm bg-gray-900/90 border border-gray-700 rounded-2xl p-6 shadow-xl">

        <h2 className="text-xl font-semibold text-center text-white mb-5">
          {role === "user" ? "Create Account" : "Vendor Registration"}
        </h2>

        {/* ROLE TOGGLE */}
        <div className="flex bg-gray-800 rounded-full p-1 mb-4">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`w-1/2 py-1.5 rounded-full text-xs font-medium transition ${
              role === "user"
                ? "bg-orange-500 text-white"
                : "text-gray-400"
            }`}
          >
            User
          </button>

          <button
            type="button"
            onClick={() => setRole("vendor")}
            className={`w-1/2 py-1.5 rounded-full text-xs font-medium transition ${
              role === "vendor"
                ? "bg-blue-600 text-white"
                : "text-gray-400"
            }`}
          >
            Vendor
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-3">

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-2.5 bg-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2.5 bg-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full p-2.5 bg-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
            required
          />

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-2.5 bg-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
              required
            />

            {/* Strength */}
            <div className="h-1 mt-1 bg-gray-700 rounded">
              <div
                className={`h-1 rounded transition-all ${
                  strength === 1
                    ? "w-1/4 bg-red-500"
                    : strength === 2
                    ? "w-2/4 bg-yellow-500"
                    : strength === 3
                    ? "w-3/4 bg-blue-500"
                    : strength === 4
                    ? "w-full bg-green-500"
                    : "w-0"
                }`}
              />
            </div>
          </div>

          {role === "vendor" && (
            <>
              <input
                name="shopName"
                placeholder="Shop Name"
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-800 rounded-lg text-sm text-white"
                required
              />

              <input
                name="gst"
                placeholder="GST Number"
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-800 rounded-lg text-sm text-white"
                required
              />

              <input
                name="address"
                placeholder="Shop Address"
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-800 rounded-lg text-sm text-white"
                required
              />

              <p className="text-xs text-yellow-400">
                Vendor accounts require admin approval.
              </p>
            </>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 transition rounded-lg text-sm font-medium"
          >
            {role === "user" ? "Signup" : "Register Vendor"}
          </button>

          <p className="text-center text-xs text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/user-login")}
              className="text-orange-400 cursor-pointer"
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default UserSignup;