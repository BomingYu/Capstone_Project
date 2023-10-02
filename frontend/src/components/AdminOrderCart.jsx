import { useNavigate } from "react-router-dom"

const AdminOrderCard = ({orderid , recipient , delivery , payment , status , upDate}) => {
    const navigate = useNavigate()
    const handleClickOrder = () => {
        navigate("/adminOrders/orderId/"+orderid)
    }
    return(
        <div className="orderCardDiv" onClick={handleClickOrder}>
            <h3>{orderid}</h3>
            <h3>{recipient}</h3>
            {delivery==true?<h3>Delivery</h3>:<h3>Pick Up</h3>}
            <h3>{payment}</h3>
            <h3>{status}</h3>
            <h3>{upDate}</h3>
        </div>
    )
}

export default AdminOrderCard