import "./Popup.scss";
const Popup = ({ onClose }: any) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>TAKE 15% OFF YOUR FIRST ORDER</p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
