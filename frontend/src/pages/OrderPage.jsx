import { useEffect } from "react"
import OrderComponent from "../components/OrderComponent"

const OrderPage = () => {
    useEffect(()=>{
        document.title = "Bill Detail"
    },[])
    return(
        <div className="pageContainer">
            <h1 className="pageTitle">Bill Details</h1>
            <OrderComponent />
        </div>
    )
}

export default OrderPage