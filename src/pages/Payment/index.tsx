import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "../../context/CartContext";
import styles from "./Payment.module.scss";
import done from "../../assets/done.png";

interface FormInput {
  name: string;
  cardNumber: string;
  month: number;
  year: number;
  cvc: number;
}

const CartValidation: React.FC = () => {
  // Initialize the form using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const { clearCart } = useCart();

  // Form is submitted
  const onSubmit = () => {
    setIsPaymentSuccessful(true);
  };

  // Format card number with spaces and limit length to 19 characters
  const formatCardNumber = (value: string): string =>
    value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .substr(0, 19); // limits the length to 19 characters

  const validateCardNumber = (value: string): boolean =>
    value.replace(/\D/g, "").length === 16;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    e.target.value = formattedValue;
  };

  return (
    <div>
      {isPaymentSuccessful ? (
        <div className={styles.successful}>
          <img src={done} alt={done} />
          <h2>Thank you for your purchase!</h2>
          <p>Your payment was successful.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>Cardholder Name</p>
            <input
              // Cardholder Name
              className={errors.name ? styles.error : ""}
              type="text"
              placeholder="Cardholder Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span>
                {errors.name.type === "required" ? "" : "Invalid name"}
              </span>
            )}
          </div>

          <div>
            <p>Card Number</p>
            <input
              //  Card Number
              className={errors.cardNumber ? styles.error : ""}
              type="text"
              placeholder="0000 0000 0000 0000"
              {...register("cardNumber", {
                required: true,
                validate: validateCardNumber,
              })}
              onChange={handleCardNumberChange}
            />
            {errors.cardNumber && errors.cardNumber.type !== "required" && (
              <span>Invalid card number (must be 16 digits)</span>
            )}
          </div>

          <div className={styles.expDate}>
            <div>
              <p>Exp. Date (MM/YY)</p>
              <input
                // month
                className={errors.month ? styles.error : ""}
                type="text"
                placeholder="MM"
                {...register("month", {
                  required: true,
                  pattern: /^(0?[1-9]|1[0-2])$/, // Pattern for valid months (01 to 12)
                })}
                maxLength={2}
              />

              {errors.month && errors.month.type !== "required" && (
                <span>Invalid month</span>
              )}

              <input
                // year
                className={errors.year ? styles.error : ""}
                type="text"
                placeholder="YYYY"
                {...register("year", {
                  required: "REQUIRED",
                  pattern: /^\d{4}$/,
                  min: {
                    value: 2023,
                    message: "Year must be 2023 or later",
                  },
                  max: {
                    value: 2030,
                    message: "Too far in the future",
                  },
                })}
                maxLength={4}
              />
              <div>
                {errors.year && errors.year.type !== "required" && (
                  <span>
                    {errors.year.type === "pattern"
                      ? "Invalid year"
                      : errors.year.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <p>CVC</p>
              <input
                // cvc
                className={errors.cvc ? styles.error : ""}
                type="text"
                placeholder="cvc"
                {...register("cvc", {
                  required: "REQUIRED",
                  pattern: /^\d{3}$/,
                })}
                maxLength={3}
              />
              <div>
                {errors.cvc && (
                  <span>
                    {errors.cvc.type === "required" ? "" : "Invalid cvc"}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button type="submit" onClick={clearCart} className={styles.pay}>
            PAY
          </button>
        </form>
      )}
    </div>
  );
};

export default CartValidation;
