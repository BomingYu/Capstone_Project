import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useInputData from "../hooks/useInputData";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import axios from "axios";
import CardPaymentComponent from "./CardPayMentComponent";

const OrderComponent = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const [recName, clearRecName] = useInputData("");
  const [phone, clearPhone] = useInputData("");
  const [isChecked, setIsChecked] = useState(true);
  const [address, clearAddress] = useInputData("");
  const [payment, setPayment] = useState("");
  const [cardNum , setCardNum] = useInputData("");

  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get("http://localhost:8080/carts/" + user.id).then((response) => {
        console.log(response.data.data);
        setOrderItems(response.data.data);
      });
    }
  }, []);

  const calculateTotal = () => {
    let total = 0;
    if (orderItems) {
      for (let i = 0; i < orderItems.length; i++) {
        const subtotal =
          Number(orderItems[i].quantity) * Number(orderItems[i].product.price);
        total = (Number(total) + Number(subtotal)).toFixed(2);
      }
    }
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(orderItems);
    if (user) {
      const orderData = {
        userid: user.id,
        recipient: recName.value,
        phone: phone.value,
        total: calculateTotal(),
        delivery: isChecked,
        address: address.value,
        orderstatus: "pending",
        payment: payment,
      };
      console.log(orderData);
    }
  };
  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleBackButton = () => [navigate("/orderItems")];

  return (
    <Form className="orderForm" onSubmit={handleSubmit}>
      <Form.Control type="text" placeholder="Recipient Name" {...recName} />
      <Form.Control type="text" placeholder="Phone" {...phone} />
      <div>
        <Form.Check
          type="checkbox"
          id="custom-switch"
          label="DELIVERY"
          className="componnetText"
          checked={isChecked}
          onChange={handleCheckBox}
        />
        <span>
          If you checked DELIVERY, please fill in the address. If you did not
          checked DELIVERY, please pick up your order in time.
        </span>
      </div>

      <Form.Control
        type="text"
        placeholder="Address"
        disabled={!isChecked}
        {...address}
      />

      <Form.Select
        className="componnetText"
        onChange={handlePayment}
        value={payment}
      >
        <option value="" disabled hidden>
          Payment
        </option>
        <option>Cash</option>
        <option>Card</option>
      </Form.Select>
      {payment == "Card" ? <CardPaymentComponent/> : null}
      <div className="orderBtnDiv">
        <Button
          variant="secondary"
          onClick={handleBackButton}
          id="componentBtn"
        >
          Back
        </Button>
        <Button variant="light" type="submit" id="componentBtn">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default OrderComponent;
