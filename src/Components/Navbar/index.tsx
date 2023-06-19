import { useState } from "react";
import "./Navbar.scss";
import wishlist from "../../assets/wishlist.svg";
import shop from "../../assets/shop.svg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [activeCategory, setActiveCategory] = useState("");

  const handleOptionChange = (
    category: string,
    event: { target: { value: string } }
  ) => {
    setSelectedOption((prevSelectedOption) => ({
      ...prevSelectedOption,
      [category]: event.target.value,
    }));
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleList = (category: string) => {
    setActiveCategory(category === activeCategory ? "" : category);
  };

  const categories = [
    {
      name: "Men",
      subcategories: ["Men", "New Arrivals", "Best Sellers", "Under $100"],
    },
    {
      name: "Women",
      subcategories: ["Women", "New Arrivals", "Best Sellers", "Under $100"],
    },
    {
      name: "Jewelry",
      subcategories: ["Jewelry", "New Arrivals", "Best Sellers", "Under $100"],
    },
  ];

  return (
    <nav>
      <h1 className="logo">STORE</h1>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <button className="burger" onClick={toggleMenu}>
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </button>

        <ul className="menu-options">
          {categories.map((category, index) => (
            <li key={index}>
              <div className="custom-select">
                <button
                  className={`select-button ${
                    category.name === activeCategory ? "active" : ""
                  }`}
                  onClick={() => toggleList(category.name)}
                >
                  {selectedOption[category.name] || category.name}
                </button>
                {category.name === activeCategory && (
                  <ul className="options">
                    {category.subcategories.map((subcategory, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleOptionChange(category.name, {
                            target: { value: subcategory },
                          })
                        }
                      >
                        {subcategory}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-nav">
        <form>
          <input
            type="search"
            id="search-input"
            name="search"
            placeholder="Search"
          />
        </form>
        <img src={wishlist} alt="wishlist" />
        <img src={shop} alt="shop" />
      </div>
    </nav>
  );
};

export default Navigation;
