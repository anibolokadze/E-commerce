import styles from "./popup.module.scss";
import popup from "../../../assets/popup.gif";
const Popup = ({ onClose }: any) => {
  return (
    <div className={`${styles["popup"]} ${styles["active"]}`}>
      <div className={styles.popupContent}>
        <img src={popup} alt={popup} />

        <h2>WELCOME</h2>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
