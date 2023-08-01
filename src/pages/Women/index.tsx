import { fetchWomenCategory } from "../../api";
import CategoryPage from "../../Components/Category";

const WomenCategory: React.FC = () => {
  return (
    <CategoryPage
      fetchData={fetchWomenCategory}
      title="Women"
      noItemsMessage="No items found within the specified price range for Women category."
    />
  );
};

export default WomenCategory;
