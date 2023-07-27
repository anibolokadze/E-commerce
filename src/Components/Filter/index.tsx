import { useState } from "react";
import Slider from "react-slider";
import arrowDown from "../../assets/double-down.gif";
import arrowUp from "../../assets/double-up.gif";
import "./index.scss";

interface FilterProps {
  minPrice: number;
  maxPrice: number;
  onSort: (descending: boolean) => void;
  onFilter: (minPrice: number, maxPrice: number) => void;
}

const Filter: React.FC<FilterProps> = ({
  minPrice,
  maxPrice,
  onSort,
  onFilter,
}) => {
  const [values, setValues] = useState<[number, number]>([minPrice, maxPrice]);

  const handleFilter = (values: number[]) => {
    setValues(values);
    onFilter(values[0], values[1]);
  };

  return (
    <>
      <div className="filter">
        <h4>Price Range</h4>
        <div>
          <span>${values[0]}</span> - <span>${values[1]}</span>
          <Slider
            onChange={handleFilter}
            value={values}
            min={minPrice}
            max={maxPrice}
          />
          <button onClick={() => onSort(true)}>
            <img src={arrowUp} alt={arrowUp} />
          </button>
          <button onClick={() => onSort(false)}>
            <img src={arrowDown} alt={arrowDown} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Filter;
