import Form from "react-bootstrap/Form";

const OrderComponent = () => {
  return (
    <Form>
      <Form.Control type="text" placeholder="Recipient Name" />
      <Form.Control type="text" placeholder="Phone" />
      <div>
        <Form.Check
          type="checkbox"
          id="custom-switch"
          label="DELIVERY"
          className="componnetText"
        />
        <span>
          If you checked DELIVERY, please fill in the address. If you did not
          checked DELIVERY, please pick up your order in time.
        </span>
      </div>
      <Form.Control type="text" placeholder="Address" />
      <Form.Select className="componnetText">
        <option value="" disabled hidden>
          Payment
        </option>
        <option>Cash</option>
        <option>Card</option>
      </Form.Select>
    </Form>
  );
};

export default OrderComponent;
