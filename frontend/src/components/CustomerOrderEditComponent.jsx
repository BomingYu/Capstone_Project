import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useInputData from "../hooks/useInputData";
import { useState } from "react";
import AlertMessage from "./AlertComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerOrderEditComponent = ({
  orderid,
  recipient,
  phoneInput,
  delivery,
  addressInput,
}) => {
  const [recName, clearrecName] = useInputData(recipient);
  const [phone, clearPhone] = useInputData(phoneInput);
  const [isChecked, setIsCheck] = useState(delivery);
  const [newAddress, clearAddress] = useInputData(addressInput);

  const [showAlert, setShowAlert] = useState(false);
  const [alertHeading, setAlertHeading] = useState("test");

  const navigate = useNavigate()

  const handleCheckBox = () => {
    setIsCheck(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recName.value !== "" || phone.value !== "") {
      const nameValue = recName.value;
      const phoneValue = phone.value;
      const deliveryValue = isChecked;
      const addressValue = newAddress.value;
      console.log(orderid)
      console.log(nameValue);
      console.log(phoneValue);
      console.log(deliveryValue);
      console.log(addressValue);
      
      let orderData;

      if(deliveryValue){
         orderData = {
          recipient : nameValue,
          phone : phoneValue,
          delivery : deliveryValue,
          address : addressValue
        }
      }
      else{
        orderData = {
          recipient : nameValue,
          phone : phoneValue,
          delivery : deliveryValue,
          address : null
        }
      }
      console.log(orderData)
      axios.put("http://localhost:8080/orders/update/"+orderid , orderData)
      .then(() => {
        navigate("/orderupdatedone")
      })
    } else {
      setShowAlert(true);
      setAlertHeading("Order Input Boxes cannot be empty!");
    }
  };

  return (
    <div className="orderViewHead">
      <h4>Edit your Order</h4>
      <Form className="orderForm" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Recipient"
          className="componnetText"
          {...recName}
        />
        <Form.Control
          type="text"
          placeholder="Phone"
          className="componnetText"
          {...phone}
        />
        <div className="checkDIV">
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
          className="componnetText"
          disabled={!isChecked}
          {...newAddress}
        />
        <AlertMessage
          show={showAlert}
          onClose={() => setShowAlert(false)}
          variant="danger"
          heading={alertHeading}
          className="danger"
        />
        <Button variant="light" type="submit" id="componentBtn">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default CustomerOrderEditComponent;
