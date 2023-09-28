import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const CartComponent = ({
  id,
  picFile,
  name,
  price,
  unit,
  stock,
  quantity,
  subtotal,
}) => {
  const [cartQuantity, setQuantity] = useState(quantity);
  const [cartSubtotal, setCartSubtotal] = useState(subtotal);

  const handleUpdate = () => {
    console.log(id)
  }

  const handleDelete = () => {
    console.log(id)
  }

  const handleQuantityChange = (e) => {
    const quantity = e.target.value;
    setQuantity(quantity);
    const subtotal = (Number(quantity) * Number(price)).toFixed(2);
    setCartSubtotal(subtotal);
  };

  return (
    <div className="cartDiv">
      <div className="cartChildDiv">
        <img className="cartPic" src={picFile} />
        <h5>{name}</h5>
      </div>
      <div className="cartChildDiv">
        <h5>
          $ {price} / {unit}
        </h5>
        <Form.Control
          type="number"
          min={1}
          max={stock}
          className="quantityInput"
          value={cartQuantity}
          onChange={handleQuantityChange}
        />
        <h5>$ {cartSubtotal}</h5>
      </div>
      <div className="cartBtn">
        <Button variant="warning" onClick={handleUpdate}>Update</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default CartComponent;
