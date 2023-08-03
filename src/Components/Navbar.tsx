import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./styles/navbar.module.scss";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { cartItems } = useCart(); // Access the cart items from the context

  // Show or hide the navigation menu
  const showNavbar = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };

  // Close the navigation menu
  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <Link to="/">
        <img src={logo} alt={logo} className={styles.logo} />
      </Link>

      <nav className={isNavOpen ? styles.responsive_nav : ""}>
        <Link to="/men" onClick={closeNavbar} className={styles.navLink}>
          Men
        </Link>
        <Link to="/women" onClick={closeNavbar} className={styles.navLink}>
          Women
        </Link>
        <Link to="/jewelery" onClick={closeNavbar} className={styles.navLink}>
          Jewelery
        </Link>

        <div className={styles.icons}>
          {/* SVG paths */}
          <Link to="shopping-cart" className={styles.link}>
            <svg
              fill="#000000"
              height="200px"
              width="200px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 489 489"
              xmlSpace="preserve"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <path d="M440.1,422.7l-28-315.3c-0.6-7-6.5-12.3-13.4-12.3h-57.6C340.3,42.5,297.3,0,244.5,0s-95.8,42.5-96.6,95.1H90.3 c-7,0-12.8,5.3-13.4,12.3l-28,315.3c0,0.4-0.1,0.8-0.1,1.2c0,35.9,32.9,65.1,73.4,65.1h244.6c40.5,0,73.4-29.2,73.4-65.1 C440.2,423.5,440.2,423.1,440.1,422.7z M244.5,27c37.9,0,68.8,30.4,69.6,68.1H174.9C175.7,57.4,206.6,27,244.5,27z M366.8,462 H122.2c-25.4,0-46-16.8-46.4-37.5l26.8-302.3h45.2v41c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h139.3v41 c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h45.2l26.9,302.3C412.8,445.2,392.1,462,366.8,462z"></path>
                </g>
              </g>
            </svg>
            <div>{cartItems.length}</div>
          </Link>
        </div>
        <button
          className={`${styles["nav-btn"]} ${styles["nav-close-btn"]}`}
          onClick={showNavbar}
        >
          <FaTimes />
        </button>
      </nav>
      <button className={styles["nav-btn"]} onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Navbar;
