import Form from "react-bootstrap/Form";

const CardPaymentComponent = () => {
    return(
        <div className="cardPaymenyForm">
            <span>Card Detail</span>
            <Form.Control type="text" placeholder="Card No."/>
            <Form.Control type="text" placeholder="Cardholder Name"/>
            <Form.Control type="text" placeholder="Expiratio Date"/>
            <Form.Control type="text" placeholder="CVC"/>
        </div>
    )
}

export default CardPaymentComponent;