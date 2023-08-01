import styles from "./coverPhoto.module.scss";

const CoverPhoto: React.FC = () => {
  return (
    <div className={styles.imageSlider}>
      <div className={styles.wrapper}></div>
    </div>
  );
};

export default CoverPhoto;
