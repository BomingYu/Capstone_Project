import { useParams } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Button from 'react-bootstrap/Button';

const CustomerOrdersPage = () => {
  const { userid } = useParams();
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:8080/orders/orderByUser/" + userid)
      .then((response) => {
        const reversedOrders = response.data.data.reverse();
        setOrders(reversedOrders);
      });
  }, []);

  function handleDisplayStatus(status){
    axios.get(`http://localhost:8080/orders/getOrderByUser/${userid}/ByStatus/${status}`)
    .then((response) => {
      const reversedOrders = response.data.data.reverse();
      setOrders(reversedOrders);
    });
  }

  function handleDisplayPayment(payment){
    axios.get(`http://localhost:8080/orders/getOrderByUser/${userid}/ByPaymnet/${payment}`)
    .then((response) => {
      const reversedOrders = response.data.data.reverse();
      setOrders(reversedOrders);
    });
  }

  function handleDisplayDeliver(deliver){
    axios.get(`http://localhost:8080/orders/getOrderByUser/${userid}/ByDeliver/${deliver}`)
    .then((response) => {
      const reversedOrders = response.data.data.reverse();
      setOrders(reversedOrders);
    });
  }

  function handleDisplayAll(){
    axios
    .get("http://localhost:8080/orders/orderByUser/" + userid)
    .then((response) => {
      const reversedOrders = response.data.data.reverse();
      setOrders(reversedOrders);
    });
  }

  return (
    <div className="cartPage">
      <h1 className="pageTitle">{userid} Order</h1>
      <div className="dropdownDiv">
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            By Status
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>handleDisplayStatus("pending")}>
              Pending
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>handleDisplayStatus("processing")}>
              Processing
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>handleDisplayStatus("shipping")}>
              Shipping
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>handleDisplayStatus("completed")}>
              Completed
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>handleDisplayStatus("cancelled")}>
              Cancelled
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            By Payment
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>handleDisplayPayment("card")}>
              Card
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>handleDisplayPayment("cash")}>
              Cash
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            By Deliver
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>handleDisplayDeliver(1)}>
              Delivery
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>handleDisplayDeliver(0)}>
              Pick Up
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button variant="dark" onClick={handleDisplayAll}>All</Button>
      </div>
      {orders.length > 0 ?  <div className="orderList">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            orderid={order.id}
            recipient={order.recipient}
            delivery={order.delivery}
            payment={order.payment}
            status={order.orderstatus}
            upDate={order.updatedAt}
          />
        ))}
      </div>:<h2>You have no corresponding order!</h2>}
     
    </div>
  );
};

export default CustomerOrdersPage;
