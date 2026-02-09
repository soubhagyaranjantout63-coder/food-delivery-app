import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Phonepay from "../assets/Phonepay.jpg";
const Payment = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce(
    (acc, item) =>
      acc + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const handleSubmitPayment = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    if (!transactionId) {
      alert("Please enter transaction ID");
      return;
    }

    try {
      setLoading(true);

      // 🔹 STEP 1 – Create Order in DB
      const orderRes = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          total: totalAmount,
          paymentStatus: "Verification Pending",
          status: "Payment Pending",
        }),
      });

      const orderData = await orderRes.json();

      // 🔹 STEP 2 – Submit Transaction ID
      await fetch(
        `http://localhost:5000/api/orders/submit-transaction/${orderData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transactionId }),
        }
      );

      alert("Payment submitted. Waiting for admin verification.");

      clearCart();
      navigate("/orders");

    } catch (error) {
      console.error(error);
      alert("Payment failed!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
    bg-gradient-to-br from-blue-900 via-black to-purple-900 
    text-white p-6">

      <h1 className="text-4xl font-bold mb-6">Scan & Pay</h1>

      {/* QR IMAGE */}
      <img
        src={Phonepay}
        alt="PhonePe QR"
        className="w-64 mb-6 rounded-xl shadow-lg"
      />

      {/* ORDER SUMMARY */}
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg mb-6">
        <h2 className="text-xl mb-4">Order Summary</h2>

        {cart.map((item) => (
          <div key={item._id} className="flex justify-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <hr className="my-4 border-gray-600" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      {/* TRANSACTION INPUT */}
      <input
        placeholder="Enter UPI Transaction ID"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
        className="p-3 bg-gray-800 rounded mb-4 w-80"
      />

      <button
        onClick={handleSubmitPayment}
        disabled={loading}
        className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg text-lg font-semibold transition"
      >
        {loading ? "Submitting..." : "Submit Payment"}
      </button>
    </div>
  );
};

export default Payment;