import { useEffect } from "react";
import AdminProductInput from "../components/AdminProductInput";
import EditProductCardComponent from "../components/EditProductCardComponent";
import { useUserContext } from "../contexts/userContext";

function HomePage() {
  const { user } = useUserContext();
  useEffect(()=>{
    document.title = "Home"
  },[])
  return (
    <div className="productPage">
      {user ? (
        <h1 className="pageTitle">Welcome {user.userName}!</h1>
      ) : (
        <h1 className="pageTitle">Welcome!</h1>
      )}
    </div>
  );
}

export default HomePage;
