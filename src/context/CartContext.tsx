import React, { createContext, useContext, useState } from "react";

// cart item type
export interface CartItem {
  id: number;
  title: string;
  quantity: number;
  img: string;
  price: number;
}

// context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  increaseQuantity: (itemId: number) => void;
  decreaseQuantity: (itemId: number) => void;
  calculateTotal: (itemId: number) => void;
  clearCart: (itemId: number) => void;
}

// context
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  calculateTotal: () => {},
  clearCart: () => {},
});

// provider component
export const CartProvider: React.FC = ({ children }: any) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

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

  // Decrease quantity
  const decreaseQuantity = (itemId: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return null; // Remove the item from the cart
        }
      } else {
        return item;
      }
    });

    // Remove null items (items with quantity 0) from the updatedCartItems array
    const filteredCartItems = updatedCartItems.filter((item) => item !== null);

    setCartItems(filteredCartItems);
  };

  // Increase quantity
  const increaseQuantity = (itemId: number) => {
    addToCart({
      id: itemId,
      title: "",
      quantity: 1,
      img: "",
      price: 1,
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        calculateTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);
