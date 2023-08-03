import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart(); // Access the cart items and removeFromCart function from the context

  const handleDeleteItem = (itemId: number) => {
    // Call the removeFromCart function to remove the item from the cart
    removeFromCart(itemId);
  };

  return (
    <>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <div>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your shopping cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.title}</span>
                <span>Quantity: {item.quantity}</span>
                <button onClick={() => handleDeleteItem(item.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
