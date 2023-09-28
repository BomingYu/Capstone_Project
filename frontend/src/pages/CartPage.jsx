import { useEffect, useState } from "react";
import CartComponent from "../components/CartComponent";
import { useUserContext } from "../contexts/userContext";
import Button from 'react-bootstrap/Button';
import axios from "axios";

function CartPage() {
  const { user } = useUserContext();
  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get("http://localhost:8080/carts/" + user.id)
      .then(response => {
        //console.log(response.data.data);
        setCartProduct(response.data.data)
      })
    }
  } , []);

  const handlePayBtn = () => {
    console.log(cartProduct[0].product)
  }

  return (
    <div className="cartPage">
      <h1 className="pageTitle">My Cart</h1>
      <div className="cartList">
        {cartProduct.map(item => {
            const picFile = "http://localhost:8080/"+item.product.picFile;
            const name = item.product.name;
            const price = item.product.price;
            const unit = item.product.unit;
            const stock = item.product.stock;
            const quantity = item.quantity
            const subtotal = (Number(price) * Number(quantity)).toFixed(2);
            return(<CartComponent id={item.id} key={item.id} picFile={picFile} name={name} price={price} unit={unit} stock={stock} quantity={quantity} subtotal={subtotal}/>)
        })}
      </div>
      <Button variant="light" onClick={handlePayBtn}>Pay</Button>
    </div>
  );
}

export default CartPage;
