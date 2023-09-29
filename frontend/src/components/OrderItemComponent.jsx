const OrderItemComponent = ({name , price , unit, quantity , subtotal}) => {
    return(
        <div className="orderItemDiv">
            <h5>{name}</h5>
            <h5>$ {price} / {unit}</h5>
            <h5>{quantity}</h5>
            <h5>{subtotal}</h5>
        </div>
    )
}

export default OrderItemComponent;