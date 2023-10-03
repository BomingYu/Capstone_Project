import { useParams } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div className="productPage">
      <h1 className="pageTitle">{userid} Order</h1>
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
      </div>:<h2>You have no order!</h2>}
     
    </div>
  );
};

export default CustomerOrdersPage;
