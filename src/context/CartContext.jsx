import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // 🔥 Load cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 🔥 Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
  console.log("Adding:", item);

  const existingItem = cart.find(i => i._id === item._id);

  if (existingItem) {
    setCart(cart.map(i =>
      i._id === item._id
        ? { ...i, quantity: Number(i.quantity) + 1 }
        : i
    ));
  } else {
    setCart([
      ...cart,
      {
        ...item,
        price: Number(item.price),
        quantity: 1
      }
    ]);
  }
};


  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
