import "./Popup.scss";
import popup from "../../assets/popup.gif";
import sparkle from "../../assets/sparkle.png";
import { FormEvent, useState } from "react";

const Popup = ({ onClose }: any) => {
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowSecondPopup(true); // Show the second popup upon form submission
  };

  const handleCloseSecondPopup = () => {
    setShowSecondPopup(false);
    onClose();
  };

  return (
    <div className="popup active">
      <div className="popup-content">
        <img src={popup} alt={popup} />

        <h2>TAKE 15% OFF YOUR FIRST ORDER</h2>
        <button className="close-button" onClick={onClose}>
          Close
        </button>

        <form onSubmit={handleSubmit}>
          <input type="email" required placeholder="EMAIL" />
          <input type="submit" value="SUBMIT" />
        </form>
      </div>

      {showSecondPopup && (
        <div className="popup active">
          <div className="popup-content">
            <img src={sparkle} alt={sparkle} />
            <h2>Thank you for your submission!</h2>
            <button className="close-button" onClick={handleCloseSecondPopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
