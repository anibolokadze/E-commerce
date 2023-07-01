import { useState } from "react";
import "./Navbar.scss";
import wishlist from "../../assets/wishlist.svg";
import shop from "../../assets/shop.svg";
import close from "../../assets/close.png";

const Navigation = () => {
  // Menu toggle state
  const [isOpen, setIsOpen] = useState(false);

  // Selected options in dropdowns
  const [selectedOption, setSelectedOption] = useState({});

  // Active category in menu
  const [activeCategory, setActiveCategory] = useState("");

  // Expand search input state
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Handle option change in dropdowns
  const handleOptionChange = (category: string, event: { target: any }) => {
    const { value } = event.target;
    setSelectedOption((prevSelectedOption) => ({
      ...prevSelectedOption,
      [category]: value,
    }));
    setActiveCategory("");
  };

  // Toggle the menu open/close state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle the active category in the menu
  const toggleList = (category: string) => {
    setActiveCategory((prevCategory) =>
      prevCategory === category ? "" : category
    );
  };

  // Handle search icon click to expand search input
  const handleSearchIconClick = () => {
    setIsSearchExpanded(true);
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

      {/* Menu */}
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <button
          className={`burger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          {isOpen ? (
            <img src={close} alt={close} className="close" />
          ) : (
            <>
              <div className="line" />
              <div className="line" />
              <div className="line" />
            </>
          )}
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

      {/* Right side navigation */}
      <div className="right-nav">
        <form>
          <div
            className={`input-container ${
              isSearchExpanded ? "expanded-search" : ""
            }`}
          >
            <input
              onClick={handleSearchIconClick}
              type="search"
              id="search-input"
              name="search"
              placeholder="Search"
            />
          </div>
        </form>

        <img src={wishlist} alt="wishlist" />
        <img src={shop} alt="shop" />
      </div>
    </nav>
  );
};

export default Navigation;
