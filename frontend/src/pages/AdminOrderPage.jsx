import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import AdminOrderCard from "../components/AdminOrderCart";
import OrderItemComponent from "../components/OrderItemComponent";
import Dropdown from "react-bootstrap/Dropdown";
import AlertMessage from "../components/AlertComponent";

export default function AdminOrderPage() {
  return (
    <div className="adminOrderPage">
      <h1 className="pageTitle">Manage Customers Orders</h1>
      <Outlet />
    </div>
  );
}

export function AdminOrderMainPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/orders").then((response) => {
      const reversedOrders = response.data.data.reverse();
      setOrders(reversedOrders);
    });
  });
  return (
    <div className="orderListBody">
      {orders.map((order) => (
        <AdminOrderCard
          key={order.id}
          orderid={order.id}
          recipient={order.recipient}
          delivery={order.delivery}
          payment={order.payment}
          status={order.orderstatus}
          upDate={order.updatedAt}
        />
      ))}
    </div>
  );
}

export function AdminOrderDetailPage() {
  const { orderid } = useParams();
  const [orderdetail, setOrderDetail] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertHeading , setAlertHeading] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/orderItems/getOrderItemsbyOrderid/" + orderid)
      .then((response) => {
        setOrderDetail(response.data.data);
      });
  });

  const handleChangeToPendingStatus = () => {
    axios.put("http://localhost:8080/orders/setOrderPending/"+orderid)
    .then(()=>{
        setShowAlert(true);
        setAlertHeading("The order status has been set to pending")
    })
  }
  const handleChangeToProdessingStatus = () => {
    axios.put("http://localhost:8080/orders/setOrderProcessing/"+orderid)
    .then(()=>{
        setShowAlert(true);
        setAlertHeading("The order status has been set to processing")
    })
  }
  const handleChangeToShippingStatus = () => {
    axios.put("http://localhost:8080/orders/setOrderShipping/"+orderid)
    .then(()=>{
        setShowAlert(true);
        setAlertHeading("The order status has been set to shipping")
    })
  }
  const handleChangeToCompletedStatus = () => {
    axios.put("http://localhost:8080/orders/setOrderCompleted/"+orderid)
    .then(()=>{
        setShowAlert(true);
        setAlertHeading("The order status has been set to completed")
    })
  }
  const handleChangeToCancelledStatus = () => {
    axios.put("http://localhost:8080/orders/setOrderCancelled/"+orderid)
    .then(()=>{
        setShowAlert(true);
        setAlertHeading("The order status has been set to cancelled")
    })
  }

  return (
    <div className="orderListBody">
      {orderdetail.map((item) => (
        <OrderItemComponent
          key={item.id}
          name={item.product.name}
          price={item.product.price}
          unit={item.product.unit}
          quantity={item.quantity}
          subtotal={(
            Number(item.product.price) * Number(item.quantity)
          ).toFixed(2)}
        />
      ))}
      <AlertMessage
              show={showAlert}
              onClose={() => setShowAlert(false)}
              variant={"primary"}
              heading={alertHeading}
            ></AlertMessage>
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          Change Order Status
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleChangeToPendingStatus}>Pending</Dropdown.Item>
          <Dropdown.Item onClick={handleChangeToProdessingStatus}>Processing</Dropdown.Item>
          <Dropdown.Item onClick={handleChangeToShippingStatus}>Shipping</Dropdown.Item>
          <Dropdown.Item onClick={handleChangeToCompletedStatus}>Completed</Dropdown.Item>
          <Dropdown.Item onClick={handleChangeToCancelledStatus}>Cancelled</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
