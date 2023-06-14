import globe from "../../assets/globe.svg";
import wishlist from "../../assets/wishlist.svg";
import shop from "../../assets/shop.svg";
import user from "../../assets/user.svg";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav>
      <ul className="top-nav">
        <li className="flex-column">
          <img src={user} alt={user} />
          Sign In
        </li>
        <li className="flex-column">
          <img src={globe} alt={globe} />
          English, usd
        </li>
      </ul>

      <ul className="main-nav">
        <div className="name">
          <h1>COZA</h1>
          <span>STORE</span>
        </div>

        <div className="nav-links">
          <li>Men</li>
          <li>Women</li>
          <li>Jewelery</li>
        </div>
        <div className="right-nav">
          <form action="/search" method="get">
            <input type="text" name="search" placeholder="Search" />
          </form>
          <div className="images">
            <img src={wishlist} alt={wishlist} className="wishlist" />
            <img src={shop} alt={shop} />
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
