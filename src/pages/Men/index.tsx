import { fetchMenCategory } from "../../api";
import CategoryPage from "../../Components/Category";

const MenCategory: React.FC = () => {
  return (
    <CategoryPage
      fetchData={fetchMenCategory}
      title="Men"
      noItemsMessage="No items found within the specified price range for Men category."
    />
  );
};

export default MenCategory;
