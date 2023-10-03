import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/userContext";
import axios from "axios";
import OrderItemComponent from "../components/OrderItemComponent";
import { useNavigate } from "react-router-dom";

const OrderItemPage = () => {
  const { user } = useUserContext();
  const [cartProduct, setCartProduct] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Confirm Order"
    if (user) {
      axios.get("http://localhost:8080/carts/" + user.id).then((response) => {
        console.log(response.data.data);
        setCartProduct(response.data.data);
      });
    }
  }, []);

  const handleBackToCart = () => {
    navigate("/carts")
  }
  const handleConfirm = () => {
    navigate("/billForm")
  }

  const calculateTotal = () => {
    let total = 0;
    if(cartProduct){
        for(let i=0 ; i<cartProduct.length ; i++){
            const subtotal = Number(cartProduct[i].quantity) * Number(cartProduct[i].product.price)
            total = (Number(total) + Number(subtotal)).toFixed(2)
        }
    }
    return total;
  }

  return (
    <div className="orderPage">
      <h1 className="pageTitle">Your Order Detail</h1>
      <div className="orderListBody">
        {cartProduct.map((item) => {
          const name = item.product.name;
          const price = item.product.price;
          const unit = item.product.unit;
          const quantity = item.quantity;
          const subtotal = (Number(price) * Number(quantity)).toFixed(2);
          return (
            <OrderItemComponent
              key={item.id}
              name={name}
              price={price}
              unit={unit}
              quantity={quantity}
              subtotal={subtotal}
            />
          );
        })}
      </div>
      <div className="totalDiv"> <h4>Total: $ {calculateTotal()}</h4></div>
      <div className="orderPageBtns">
        <Button variant="secondary" onClick={handleBackToCart}>Back</Button>
        <Button variant="light" onClick={handleConfirm}>Confirm</Button>
      </div>
    </div>
  );
};

export default OrderItemPage;
