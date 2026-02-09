import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Email verified successfully!");
      navigate("/user-login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <form
        onSubmit={handleVerify}
        className="bg-gray-900 p-8 rounded-xl w-96"
      >
        <h2 className="text-xl mb-4 text-center">Verify Email</h2>

        <p className="text-sm text-gray-400 mb-4">
          OTP sent to {email}
        </p>

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full mb-4 p-3 bg-gray-800 rounded"
          required
        />

        <button className="w-full bg-orange-500 py-2 rounded">
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default VerifyOTP;
