import { useState } from "react";
import Slider from "react-slider";
import "./styles/filter.scss";

// Interface for FilterProps
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
  const [isShown, setIsShown] = useState<boolean>(false);

  // Handle price range filtering
  const handleFilter = (values: number[]) => {
    setValues(() => [values[0], values[1]]);
    onFilter(values[0], values[1]);
  };

  // Toggle filter visibility
  const handleClick = () => {
    setIsShown((current) => !current);
  };

  return (
    <>
      <div className="filter">
        <div className="heading" onClick={handleClick}>
          <p>Filter</p>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAcUlEQVR4nO2VwQnAIAxF3wx15dpxOoMLCB2nnuyhOYgXG9GDNA8+SiCYj3wCxssBJCDL6ZlAAja5O+BuNVwykVYlZf1koBOncdKDr/5kn/GIsUAOWgRlDnJDkY9YDoyF8hMH7ZEsCiOcuB4nGvw/98gDw8dY0pEG0z8AAAAASUVORK5CYII=" />
        </div>
        {isShown ? (
          <>
            <div className="isShown">
              <div className="price">
                <h4>Price Range</h4>
                <span>${values[0]}</span> - <span>${values[1]}</span>
              </div>
              <Slider
                onChange={handleFilter}
                value={values}
                min={minPrice}
                max={maxPrice}
              />
              <div className="sortingBtn">
                <h4>Sort by rating</h4>
                <button onClick={() => onSort(true)}>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAuklEQVR4nO3XWwrCMBBG4bOJCXb/WxEE65N96HKUQgoiKtXmMoP/gUAIhOQjTwGllFJKKaVUmRJwBMY8D5kBV+CWxwwMBCsBUwZMT/MU8SVm4PBibYiIWAuDsQ+IMBjbgHCPsS8QbjH2A8IdxnYg3GCsAKI7xgoiumGsAqI5xioimmGsAeLdWUNERDVMD0RxTE9EMYwHxG6MJ8QuzOj0N5cefprnLRtOwMUZYi3luy13VEoppZRS6k+7A5pSdBk89UVrAAAAAElFTkSuQmCC" />
                </button>
                <button onClick={() => onSort(false)}>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAv0lEQVR4nO3XSwqDMBRG4bOJG3T/O2lHfU3qoMtpETIQKSVqHjf0PyA48ML9zCiglFJKKaXUP3cC7kDAXwF4AOeUj6/AG5icYULcad7tkjJgwDMOvICx/I6bdxr2Do49Ijxh7CjCA8ZyIVpiLDeiBcZKIWpirDSiBqYaoiSmOqIEphkiJ6Y5IgfGDeIIxh1iD8YtYgvGPSIF0w3iF6Y7xLfb3LR693TrTGp5Ct2dxLr579/i091JKKWUUkophcs+GiV0FcyNP/cAAAAASUVORK5CYII=" />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Filter;
