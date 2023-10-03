import { useEffect } from "react";
import AddProductComponent from "../components/AddProductComponent";

const AddProductPage = () => {
    useEffect(()=>{
        document.title = "Add A New Product"
    },[])
    return(
        <div className="pageContainer addNewProductPage">
            <h1 className="pageTitle">Add New Product</h1>
            <AddProductComponent/>
        </div>
    )
}

export default AddProductPage;