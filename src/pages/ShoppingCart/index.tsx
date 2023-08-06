import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, decreaseQuantity, increaseQuantity } =
    useCart(); // Access the cart items and removeFromCart function from the context

  const handleDeleteItem = (itemId: number) => {
    // Call the removeFromCart function to remove the item from the cart
    removeFromCart(itemId);
  };

  console.log(cartItems);
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "white",
          padding: "10px",
          margin: "0 50px",
          display: "flex",
          alignItems: "center",
          columnGap: "5px",
        }}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAl0lEQVR4nO2UQQrCQAxF3ync2KV38Fheo3tXXsaFvVBXnbpKEb4yMKi0k3Q1Dz4MIeTDZxJYx+nL25ULkICjlFRzNzlr+FVKqrmZvSKapVEGSe933S3GA9ADE2DSE7gB3ZpB92yAt4bcyIL1oSj8oKrX9jay6OiGQJPH1kiq+6wZ/aFFV9B+XUHbo+o9CrvciIgLXlzucBaH3vKSU22DyAAAAABJRU5ErkJggg==" />
        Continue Shopping
      </button>
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
                <img src={item.img} alt={item.title} />{" "}
                {/* Display the image */}
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
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
