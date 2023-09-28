import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import thumbUp from "../assets/icons/thumb-up.png";
import thumpDown from "../assets/icons/thumb-down.png";
import { useNavigate } from "react-router-dom";
import  {useUserContext}  from "../contexts/userContext";
import AlertMessage from "./AlertComponent";
import { useState } from "react";
import axios from "axios";

function ProducrCard({ id, picUrl , title , price , unit , up , down}) {
  const navigate = useNavigate();
  const {user} = useUserContext();

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState();
  const [alertHeading, setAlertHeading] = useState();

  const handleDetailButton = () => {
    navigate("/products/byId/" + id)
  }
  const handleAddToCart = () => {
    if(user){
      console.log(id)
      console.log(user.id)
      const cartData = {
        userid : user.id,
        productid : id
      }
      axios.post("http://localhost:8080/carts/add" , cartData)
      .then((response) => {
        setAlertVariant("primary");
        setAlertHeading("Added!");
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
    <Card style={{ width: "18rem" }} className="productCard" key={id}>
      <Card.Img variant="top" src={picUrl} className="productImg"/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Title>${price}/{unit}</Card.Title>
        <div className="thumbsDiv">
          <Card.Img
            variant="top"
            src={thumbUp}
            className="rateThumb"
            style={{ width: "24px", height: "24px" }}
          />
          <span>{up}</span>
          <Card.Img
            variant="top"
            src={thumpDown}
            className="rateThumb"
            style={{ width: "24px", height: "24px" }}
          />
          <span>{down}</span>
        </div>
        <AlertMessage
        show={showAlert}
        onClose={() => setShowAlert(false)}
        variant={alertVariant}
        heading={alertHeading}
        className={alertVariant} />
        <div className="cardBtnDiv">
          <Button variant="secondary" onClick={handleDetailButton}>Details</Button>
          <Button variant="warning" onClick={handleAddToCart}>Add To Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProducrCard;
