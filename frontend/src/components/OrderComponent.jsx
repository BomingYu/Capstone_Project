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

  const handleTest = () => {
    const phoneNumberRegex = /^\d{7,15}$/;
    console.log(phoneNumberRegex.test(phone.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(orderItems);
    const phoneNumberRegex = /^\d{7,15}$/;
    let orderData;
    if(user){
      if(isChecked){
        if(recName.value!="" && phoneNumberRegex.test(phone.value) && address.value!="" && payment!=""){
          orderData={
            userid : user.id,
            recipient : recName.value,
            phone : phone.value,
            delivery : isChecked,
            address : address.value,
            total : calculateTotal(),
            payment : payment
          }
        }
        else{
          setShowAlert(true);
          setAlertHeading("All Order Input are Required!")
          return
        }
      }
      else{
        if(recName.value!==""&&phone.value!==""&&payment!==""){
          orderData={
            userid : user.id,
            recipient : recName.value,
            phone : phone.value,
            delivery : isChecked,
            address : address.value,
            total : calculateTotal(),
            payment : payment
          }
        }
          else{
            setShowAlert(true);
            setAlertHeading("All Order Input are Required!")
            return
          }
      }
      ///////////////////////////////////////////////////////////////////////////////
      // if(recName.value!==""&&phone.value!==""&&payment!==""){
      //   orderData={
      //     userid : user.id,
      //     recipient : recName.value,
      //     phone : phone.value,
      //     delivery : isChecked,
      //     address : address.value,
      //     total : calculateTotal(),
      //     payment : payment
      //   }
      //   if(!orderData.delivery){
      //     orderData.address = null;
      //   }
      // }
      // else{
      //   setShowAlert(true);
      //   setAlertHeading("All Order Input are Required!")
      // }
    }
    else{
      return
    }
    if(orderData){
      //console.log(orderData)
      axios.post("http://localhost:8080/orders/" , orderData)
      .then(response => {
        const orderid = response.data.data.id
        console.log(response.data.data);
        const newOrderItems = orderItems.map(item => ({
          orderid : orderid,
          productid : item.product.id,
          quantity : item.quantity,
          price : item.product.price,
          subtotal : (Number(item.product.price) * Number(item.quantity)).toFixed(2)
        }))
        console.log(newOrderItems)
        return axios.post("http://localhost:8080/orderItems/addItemsOnce" , newOrderItems)
      })
      .then(response => {
         const orderItemsResponse = response.data.data
         console.log("lastResponse:" , orderItemsResponse)
         console.log(orderItems)

        const productStockRequests = []
        orderItems.forEach(item => {
          const apiUrl = "http://localhost:8080/products/update/"+item.productid;
          const newStock = (Number(item.product.stock)-Number(item.quantity)).toFixed(2)
          productStockRequests.push(axios.put(apiUrl , {stock:newStock}))
        })
        return Promise.all(productStockRequests)
      })
      .then(response => {
        axios.delete("http://localhost:8080/carts/deleteCartByUser/"+user.id)
      })
      .then(()=>{
        navigate("/orderdone")
      })
      .catch((error) => {
        if (error.response) {
          // setAlertVariant("danger");
          // setAlertHeading(error);
          // setShowAlert(true);
          console.log(error)
        }
      });
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
        <button onClick={handleTest}>test</button>
      </div>
    </Form>
  );
};

export default OrderComponent;
