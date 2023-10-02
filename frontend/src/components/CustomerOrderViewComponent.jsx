const CustomerOrderViewComponent = ({
  recipient,
  phone,
  delivery,
  address,
  status,
  date,
}) => {
  return (
    <div className="orderViewHead">
      <h4>Order Detail</h4>
      <div className="orderViewBodyDiv">
        <div className="firstOrderViewItem">
          <h5>Recipient Name: </h5>
          <h5>{recipient}</h5>
        </div>
        <div className="orderViewItem">
          <h5>Recipient Phone: </h5>
          <h5>{phone}</h5>
        </div>
        {delivery == true ? (
          <>
            <div className="orderViewItem">
              <h5>Delivery</h5>
            </div>
            <div className="orderViewItem">
              <h5>Delivery Address: </h5>
              <h5>{address}</h5>
            </div>
          </>
        ) : (
          <div className="orderViewItem">
            <h5>Pick Up</h5>
          </div>
        )}

        <div className="orderViewItem">
          <h5>Order Status: </h5>
          <h5>{status}</h5>
        </div>
        <div className="lastOrderViewItem">
          <h5>Date: </h5>
          <h5>{date}</h5>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderViewComponent;
