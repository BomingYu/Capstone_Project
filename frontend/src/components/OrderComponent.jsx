import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useInputData from "../hooks/useInputData";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import axios from "axios";
import CardPaymentComponent from "./CardPayMentComponent";
import AlertMessage from "./AlertComponent";

const OrderComponent = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const [recName, clearRecName] = useInputData("");
  const [phone, clearPhone] = useInputData("");
  const [isChecked, setIsChecked] = useState(true);
  const [address, clearAddress] = useInputData("");
  const [payment, setPayment] = useState("");
  const [cardNum, setCardNum] = useInputData("");

  const [orderItems, setOrderItems] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertHeading, setAlertHeading] = useState("test");

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
    let orderData;
    if (user) {
      if (isChecked) {
        console.log("ischecked is true");
        if (
          recName.value !== "" ||
          phone.value !== "" ||
          address.value !== "" ||
          payment !== ""
        ) {
          orderData = {
            userid: user.id,
            recipient: recName.value,
            phone: phone.value,
            total: calculateTotal(),
            delivery: isChecked,
            address: address.value,
            orderstatus: "pending",
            payment: payment,
          };
        }
        else{
          setShowAlert(true);
          setAlertHeading("Please fill in all input boxes!")
        }
      }
      if(!isChecked){
        console.log("ischecked is false");
        if (
          recName.value !== "" ||
          phone.value !== "" ||
          payment !== ""
        ) {
          orderData = {
            userid: user.id,
            recipient: recName.value,
            phone: phone.value,
            total: calculateTotal(),
            delivery: isChecked,
            orderstatus: "pending",
            payment: payment,
          };
        }
        else{
          setShowAlert(true);
          setAlertHeading("Please fill in all input boxes!")
        }
      }
      if(orderData){
        console.log(orderData);
      }
      else{
        console.log("No data orderData");
      }
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
      {payment == "Card" ? <CardPaymentComponent /> : null}
      <AlertMessage
        show={showAlert}
        onClose={() => setShowAlert(false)}
        variant="danger"
        heading={alertHeading}
        className="danger"
      />
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
