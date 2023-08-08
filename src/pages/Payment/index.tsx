import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

  // State to track whether the user has registered
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  // Form is submitted
  const onSubmit = () => setIsRegistered(true);

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
      <button onClick={() => navigate(-1)}>Go Back</button>
      {isRegistered ? (
        <p>Welcome</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Cardholder Name"
              {...register("name", { required: true })}
            />
            {errors.name && <span>Cardholder Name cannot be empty</span>}
          </div>

          <div>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              {...register("cardNumber", {
                required: true,
                validate: validateCardNumber,
              })}
              onChange={handleCardNumberChange}
            />
            {errors.cardNumber && (
              <span>
                {errors.cardNumber.type === "validate"
                  ? "Invalid card number (must be 16 digits)"
                  : "Card Number cannot be empty"}
              </span>
            )}
          </div>

          <button type="submit">CLAIM YOUR FREE TRIAL</button>
        </form>
      )}
    </div>
  );
};

export default CartValidation;
