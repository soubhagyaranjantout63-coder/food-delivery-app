import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Common/Navbar";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import UserLogin from "./Pages/UserLogin";
import AdminLogin from "./Pages/AdminLogin";
import Orders from "./Pages/Orders";
import AddItem from "./Pages/AddItem";
import UserProfile from "./Pages/UserProfile";
import Payment from "./Pages/Payment";
import PaymentSuccess from "./Pages/PaymentSuccess";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminAnalytics from "./Pages/AdminAnalytics";
import RestaurantDetails from "./Pages/RestaurantDetails";
import Admin from "./Pages/Admin";
import UserSignup from "./Pages/UserSignup";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import Hero from "./Components/HomeComponents/hero";
import VendorLogin from "./Pages/VendorLogin";
import VendorDashboard from "./Pages/VendorDashboard";
import VerifyOTP from "./Pages/VerifyOTP";
function App() {

  const [auth, setAuth] = useState(() => {
    return JSON.parse(localStorage.getItem("auth"));
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">

      <Navbar auth={auth} setAuth={setAuth} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user-login" element={<UserLogin setAuth={setAuth} />} />
        <Route path="/admin-login" element={<AdminLogin setAuth={setAuth} />} />
        <Route path="/profile" element={<UserProfile setAuth={setAuth} />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-analytics" element={<AdminAnalytics />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/vendor-login" element={<VendorLogin setAuth={setAuth} />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Routes>

    </div>
  );
}

export default App;