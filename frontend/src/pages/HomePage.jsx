import { useUserContext } from "../contexts/userContext";
import ProductListComponent from "../components/ProductListComponent";

function HomePage() {

  const { user } = useUserContext();
  return (
    <div className="productPage">
      {user ? (
        <h1 className="pageTitle">Welcome {user.userName}!</h1>
      ) : (
        <h1 className="pageTitle">Welcome!</h1>
      )}
      <ProductListComponent />
    </div>
  );
}

export default HomePage;
