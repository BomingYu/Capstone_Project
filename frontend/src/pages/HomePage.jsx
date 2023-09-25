import ProducrCard from "../components/ProductCard";
import { useUserContext } from "../contexts/userContext";
import ProductListComponent from "../components/ProductListComponent"

function HomePage(){
    const {user} = useUserContext();
    return(
        <div className="pageContainer">
            {user?  <h1 className="pageTitle">Welcome {user.userName}!</h1> :  <h1 className="pageTitle">Welcome!</h1>}
            <ProducrCard />
            <ProductListComponent />
        </div>
    )
}

export default HomePage;