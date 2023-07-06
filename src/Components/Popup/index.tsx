const Popup = ({ message, onClose }: any) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>{message}</p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
