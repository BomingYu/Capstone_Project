import OrderComponent from "../components/OrderComponent";
import OrderItemComponent from "../components/OrderItemComponent";
import { useUserContext } from "../contexts/userContext";

function HomePage() {
  const { user } = useUserContext();
  return (
    <div className="productPage">
      {user ? (
        <h1 className="pageTitle">Welcome {user.userName}!</h1>
      ) : (
        <h1 className="pageTitle">Welcome!</h1>
      )}
      <OrderComponent />
    </div>
  );
}

export default HomePage;
