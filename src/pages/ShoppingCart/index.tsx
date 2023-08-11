import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./shoppingCart.module.scss";

const ShoppingCart: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    calculateTotal,
  } = useCart(); // Access the cart items and removeFromCart function from the context

  const handleDeleteItem = (itemId: number) => {
    // Call the removeFromCart function to remove the item from the cart
    removeFromCart(itemId);
  };

  const totalAmount = calculateTotal().toFixed(2);

  return (
    <>
      <div>
        {cartItems.length === 0 ? (
          <p className={styles.empty}>Your shopping cart is empty.</p>
        ) : (
          <ul className={styles.shoppingCartList}>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className={styles.wrapper}>
                  <img src={item.img} alt={item.title} />
                  <div className={styles.info}>
                    <span>{item.title}</span>
                    <div className={styles.quantity}>
                      <span>$ {item.price}</span>
                      <div className={styles.buttons}>
                        <button onClick={() => increaseQuantity(item.id)}>
                          +
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => decreaseQuantity(item.id)}>
                          -
                        </button>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className={styles.deleteBtn}
                      >
                        <img
                          style={{ width: "30px" }}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE50lEQVR4nO2by29VdRDHP5bYXtRQi8ZXomJ5CCpFNMbHAnyuVfQfEFSs+Iq6qEYj7NSNMVaLVSl15QMxkZXAAtCiUQQjEdEFyMKdkIimNxpKzSRzksnknNtz7/mdc8/R+01+SXM7v/nN/F4zv5k50EEHHeSMGrASeA4YAyaAo8AJ4B9tJ/Q3+d8mYEj7SN9K4lxgDbATqAPTLTbpuwNYrTxLj6uB8YxKN5qMzcASSogFwFbgdIzg8ttBYBh4GLgNuALoA87UJn/3A7cDa4ER4FDCREwBW5S+7agBGxJWXM7zOuCCDPwvAZ4C9iXsiJeAHtqERcCBmNXZBtyQw3jLgfeBU27M/cBCCsb9wEknyC7gmgLGlsn9xo0tsqyiIKzTlY4G/xN4ADijKAGALuAxd/REpsG8B37ezfwPwGLahwHgsJNJZMwFgzFbfg7th/gHu51sT+Zx5qfMAJ+VzEurqUz2ONwX0sb/YZjvLpnyEbqB7e5uynw8a8D3humhkrukc9TpiuQ9kHWxNjjHYxnlxyJnotdn2fp1wyh3ExMQa9zCzW+FyVbD5Gu1vVWB+CR7jPyfNMvgKvOwkRv1eqqHAeM2T6lOqTFuZu9TqosPjR6iUyr0ApOm481UF8vMTq6ntWAPGuW/pfrYa/SRy3FG7AzsUva2aD4HAvkcjxt9JLzWEDVj+mTrXJxx8LOBX5WfhLNmpbzB39I+vwHnZJThIncMGjpGtzqvLyvmu0fK+AzmVJTf6Pq0ZMMdfjT8JNqciCFDKHG5EHjVKTSWMAlxykscMQRGDE/RMRFjhlCCk6HwslNsk5sEUf5NR/NOQOfrETd2IiYMoURvQ+IVp+B7qmDeygvuMLy/bER4zBDOIyxE0Tecom/HbPuNOYTX+g1/uZQTcdwQSqyeAiYhz5WPcJ4Z4/dGhH8bQklYkNMkDBeofBQsicYRHVNNQHdOwsSdeWnvlmECjhvCuQUqn/ckpD4Cx3K8BLv05rcKj5TtEpwwhOIVhlTe+hjSRo0ZHM55J9xleH/RiHDMED4UaPBZ+g5otMp5T8KjaR2hIUMoZzUEbHBF2usJWzzOFQ4lw2haV3ilIZTwclZc6xR6bYbznddj6BfDb0Uzz+ELA8QCjio/cYXTwB6HnwIkYS4zyk+mqSfYYTpIJjgrzmrRovQHykA9a/T5vNmY+l6qj/1GH0njp0ovTZpOVQyJR7jJ6FHXI5kKm03HD6gutqU1fx5LTDpckgtLqR5udMmdK5tlsMXM3p6CS2CyostVlkmCpKVbuG6YSLVmVfCEM30tv2vWG0Z/NZtfaxOWukv8hSzMepwZOViSuqAkzHVe374QhZQLXInMrpKWyMzWl14k50ktlgiCVSUvkprtiqTEct0depC17pHyFXA+7UefK4aY1nxgIYWSh9tcN7TcnflcCyVtlsUWLNe1bLXIEpouzVxbM32qyDqme9zFOK0FzHlUicd5eL58XmS5l4Jxud4DVpDT6n/fksN41wEfxXyU0ZZy+QhiY190jkfUvgOeBi6ldUjfZ5wvYj28tn4wYTFPV8eaStt+1jzgoCYqF+rt3a2tT3+7U2lGYy63qMkYH5flkxmPxfrs/N99NOXRq9GX7QnHI22bVB6rmwlmlA09Gokd0t0h+fkjMR9OHtH/RR9OrijL+e6gA/67+BcVgnghEuwUgwAAAABJRU5ErkJggg=="
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.total}>
          <h1>Total: ${calculateTotal().toFixed(2)}</h1>
        </div>

        {/* Conditionally render the CONFIRM ORDER button */}
        {totalAmount > "0.00" && (
          <Link to="/payment">
            <button className={styles.confirmOrder}>CONFIRM ORDER</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
