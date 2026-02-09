import React from "react";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-20 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Contact FoodHub</h1>
        <p className="text-lg opacity-90">
          We would love to hear from you. Get in touch with us.
        </p>
      </div>

      {/* CONTACT SECTION */}
      <div className="max-w-6xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12">

        {/* LEFT SIDE INFO */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Get In Touch
          </h2>

          <div className="space-y-6 text-gray-600">

            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-full text-orange-500 text-xl">
                📍
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Address</h4>
                <p>Bhubaneswar, Odisha, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-full text-orange-500 text-xl">
                📞
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-full text-orange-500 text-xl">
                📧
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Email</h4>
                <p>support@foodhub.com</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Send Message
          </h3>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-lg hover:bg-orange-600 transition duration-300"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;
