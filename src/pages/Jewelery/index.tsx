import { fetchJeweleryCategory } from "../../api";
import CategoryPage from "../../Components/Category";

const JeweleryCategory: React.FC = () => {
  return (
    <CategoryPage
      fetchData={fetchJeweleryCategory}
      title="Jewelery"
      noItemsMessage="No items found within the specified price range for Jewelery category."
    />
  );
};

export default JeweleryCategory;
