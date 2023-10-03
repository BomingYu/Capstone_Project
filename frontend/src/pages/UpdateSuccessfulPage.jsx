import { useEffect } from "react";

const UpdateSuccessfulPage = () => {
  useEffect(()=>{
    document.title = "Updated"
  },[])
    return (
      <div className="productPage">
        <h1 className="pageTitle">Your order has been successfully updated!</h1>
      </div>
    );
  };
  export default UpdateSuccessfulPage