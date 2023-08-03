import React, { createContext, useContext, useState } from "react";

// cart item type
export interface CartItem {
  id: number;
  title: string;
  quantity: number;
}

// context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
}

// context
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

// provider component
export const CartProvider: React.FC = ({ children }: any) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // add items to the cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevCartItems) => {
      // Check if the item is already in the cart
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        // If the item exists, increase the quantity
        return prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // If the item doesn't exist, add it to the cart
        return [...prevCartItems, item];
      }
    });
  };

  // Remove an item from the cart
  const removeFromCart = (itemId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);
