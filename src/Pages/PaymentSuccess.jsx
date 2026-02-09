import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const transactionId = location.state?.transactionId;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center 
    bg-gradient-to-br from-green-900 via-black to-green-700 
    text-white text-center">

      <h1 className="text-4xl font-bold text-green-400 mb-4">
        🎉 Payment Successful!
      </h1>

      <p className="text-lg mb-4">
        Thank you for your order ❤️
      </p>

      {transactionId && (
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-400">Transaction ID</p>
          <p className="text-xl font-bold text-orange-400">
            {transactionId}
          </p>
        </div>
      )}

      <button
        onClick={() => navigate("/orders")}
        className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Track Order
      </button>

    </div>
  );
};

export default PaymentSuccess;