import thumbUp from "../assets/icons/thumb-up.png";
import thumpDown from "../assets/icons/thumb-down.png";
import Button from 'react-bootstrap/Button';
import { useUserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertComponent";
import { useState } from "react";
import axios from "axios";

const ProductDetailComponent = ({id , picFile , name , price , unit , description , up , down}) => {
  const {user} = useUserContext();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState();
  const [alertHeading, setAlertHeading] = useState();

  function isEmptyObj(){
    const propertise = Object.keys(user)
    if(propertise.length == 0){
      return true
    }
    else{
      return false
    }
  }

  const handleAddToCart = () => {
    if(!isEmptyObj()){
      console.log(id)
      console.log(user.id)
      const cartData = {
        userid : user.id,
        productid : id
      }
      axios.post("http://localhost:8080/carts/add" , cartData)
      .then((response) => {
        setAlertVariant("primary");
        setAlertHeading(`${name} has been added into your cart!`);
        setShowAlert(true);
      })
      .catch((error) => {
        if (error.response) {
          // setAlertVariant("danger");
          // setAlertHeading(error);
          // setShowAlert(true);
          console.log(error)
        }
      });
    }
    else{
      navigate("/login")
    }
  }

  return (
    <div className="productDetail">
      <img
        src={picFile}
        className="productDetailPic"
      />
      <h2>{name}</h2>
      <h3>$ {price} / {unit}</h3>
      <AlertMessage
        show={showAlert}
        onClose={() => setShowAlert(false)}
        variant={alertVariant}
        heading={alertHeading}
        className={alertVariant} />
      <div className="detailWeidges">
        <div className="thumbsDivInDetail">
          <img src={thumbUp} style={{ width: "24px", height: "24px" }} />
          <span>{up}</span>
          <img src={thumpDown} style={{ width: "24px", height: "24px" }} />
          <span>{down}</span>
        </div>
        <Button variant="warning" onClick={handleAddToCart}>Add To Cart</Button>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default ProductDetailComponent;
