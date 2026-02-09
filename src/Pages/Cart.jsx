import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const deliveryFee = total > 0 ? 40 : 0;
  const grandTotal = total + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="md:col-span-2">
            {cart.map(item => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-gray-900 p-4 rounded-lg mb-4"
              >
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-orange-400">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="bg-gray-800 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item._id)}
                    className="bg-gray-800 px-3 py-1 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-400 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>

            <div className="border-t border-gray-700 my-3"></div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-orange-400">
                ₹{grandTotal}
              </span>
            </div>

            <button
              onClick={() =>
                navigate("/payment", { state: { grandTotal, cart } })
              }
              className="w-full mt-6 bg-orange-500 py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Proceed to Payment
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;