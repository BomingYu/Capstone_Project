import { useEffect } from "react";

const OrderSuccessfullPage = () => {
  useEffect(()=>{
    document.title = "All Done!"
  },[])
  return (
    <div className="productPage">
      <h1 className="pageTitle">Your order has been successfully placed!</h1>
    </div>
  );
};
export default OrderSuccessfullPage
