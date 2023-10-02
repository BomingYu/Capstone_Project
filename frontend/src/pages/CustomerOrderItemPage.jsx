import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderItemComponent from "../components/OrderItemComponent";
import CustomerOrderViewComponent from "../components/CustomerOrderViewComponent";
import Button from "react-bootstrap/Button";
import AlertMessage from "../components/AlertComponent";
import CustomerOrderEditComponent from "../components/CustomerOrderEditComponent";

function CustomerOrderItemPage() {
  const { orderid } = useParams();
  const [orderdetail, setOrderDetail] = useState([]);
  const [order, setOrder] = useState();

  const [updateStatus, setUpdateStatus] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/orderItems/getOrderItemsbyOrderid/" + orderid)
      .then((response) => {
        console.log(response.data.data);
        setOrderDetail(response.data.data);

        return axios.get(
          "http://localhost:8080/orders/orderByorderid/" + orderid
        );
      })
      .then((response) => {
        console.log("response", response.data.data);
        setOrder(response.data.data);
      });
  }, []);

  const handleUpdateOrder = () => {
    if (order.orderstatus == "Pending") {
      setUpdateStatus(true);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="productPage">
      <h1 className="pageTitle">Order {orderid} Details</h1>

      {orderdetail.length != 0 ? (
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
          {updateStatus? <div>{order && (<CustomerOrderEditComponent orderid = {order.id} recipient={order.recipient} phoneInput={order.phone} delivery={order.delivery} addressInput={order.address}/>)}</div> : <div>
            {order && (
              <CustomerOrderViewComponent
                recipient={order.recipient}
                phone={order.phone}
                delivery={order.delivery}
                address={order.address}
                status={order.orderstatus}
                date={order.updatedAt}
              />
            )}
            <AlertMessage
              show={showAlert}
              onClose={() => setShowAlert(false)}
              variant={"danger"}
              heading={
                "You can only change update the order detail if the order in 'Pending' status."
              }
            ></AlertMessage>
            <Button variant="light" onClick={handleUpdateOrder} id="componentBtn">
              Update Order Details
            </Button>
          </div>}
          
        </div>
      ) : (
        <h2>Nothing in This Order</h2>
      )}
    </div>
  );
}

export default CustomerOrderItemPage;
