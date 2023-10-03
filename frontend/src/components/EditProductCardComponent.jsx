import { useNavigate } from "react-router-dom";

const EditProductCardComponent = ({id , picFile , barcode , price, unit , stock , avaliable}) => {
    const navigate = useNavigate()
    function gotoProductDetail(){
        navigate("/adminProducts/"+id)
    }

    return(
        <div className="editProductCard" onClick={gotoProductDetail}>
            <h3>{id}</h3>
            <img src={picFile} className="cartPic"/>
            <span>{barcode}</span>
            <h3>${price} / {unit}</h3>
            <h3>{stock}</h3>
            {avaliable == true? <h3 className="avaText">Available</h3>:<h3 className="unavaText">Unavailable</h3>}
        </div>
    )
}

export default EditProductCardComponent;