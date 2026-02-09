import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">FoodExpress</h2>
          <p className="mt-3 text-gray-400">
            Delicious food delivered to your doorstep. Fast, fresh, and affordable.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Safety</li>
            <li className="hover:text-white cursor-pointer">Payments</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Instagram</li>
            <li className="hover:text-white cursor-pointer">Facebook</li>
            <li className="hover:text-white cursor-pointer">Twitter</li>
            <li className="hover:text-white cursor-pointer">YouTube</li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-gray-500 border-t border-gray-700 pt-5 mt-8">
        © {new Date().getFullYear()} FoodExpress — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
