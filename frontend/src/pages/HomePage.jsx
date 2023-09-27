import { useUserContext } from "../contexts/userContext";
import ProductListComponent from "../components/ProductListComponent";
import CommentComponent from "../components/CommentComponent";
import ProductDetailComponent from "../components/ProductDetailComponent";
import CommentInputComponent from "../components/CommentInputComponent";

function HomePage() {

  const { user } = useUserContext();
  return (
    <div className="productPage">
      {user ? (
        <h1 className="pageTitle">Welcome {user.userName}!</h1>
      ) : (
        <h1 className="pageTitle">Welcome!</h1>
      )}
      
      <ProductDetailComponent />
      <CommentInputComponent />
      <CommentComponent />
    </div>
  );
}

export default HomePage;
