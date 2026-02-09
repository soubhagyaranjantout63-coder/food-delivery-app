import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailOrPhone: email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("auth", JSON.stringify(data.user));
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-gray-900 relative overflow-hidden px-4">

      {/* Background Glow Effects */}
      <div className="absolute w-96 h-96 bg-orange-500 opacity-20 blur-3xl rounded-full -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-blue-600 opacity-20 blur-3xl rounded-full bottom-0 right-0"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl">

        <h2 className="text-2xl font-semibold text-center text-white mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-400 text-sm mb-6">
          Login to continue ordering delicious food
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email or Phone</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 bg-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 cursor-pointer text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-xs text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-orange-500" />
              Remember me
            </label>

            <span
              onClick={() => alert("Forgot password feature coming soon")}
              className="hover:text-orange-400 cursor-pointer"
            >
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition shadow-lg hover:shadow-orange-500/30"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-gray-600 text-xs">
            <div className="flex-1 h-px bg-gray-700"></div>
            OR
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Signup Redirect */}
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-orange-400 hover:underline cursor-pointer"
            >
              Signup
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default UserLogin;
