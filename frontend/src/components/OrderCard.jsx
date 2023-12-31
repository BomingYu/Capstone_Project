import { useNavigate } from "react-router-dom"

const OrderCard = ({orderid , recipient , delivery , payment , status , upDate}) => {
    const navigate = useNavigate()
    const handleClickOrder = () => {
        navigate("/myOrderDtail/"+orderid)
    }
    return(
        <div className="orderCardDiv" onClick={handleClickOrder}>
            <h3>{orderid}</h3>
            <h3>{recipient}</h3>
            {delivery==true?<h3 className="delivery">Delivery</h3>:<h3 className="pickup">Pick Up</h3>}
            <h3>{payment}</h3>
            <h3 className={status}>{status}</h3>
            <h3>{upDate}</h3>
        </div>
    )
}

export default OrderCard