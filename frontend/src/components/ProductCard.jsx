import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import thumbUp from "../assets/icons/thumb-up.png";
import thumpDown from "../assets/icons/thumb-down.png";

function ProducrCard({id , picUrl , title , price , unit , up , down}) {
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
        <div className="cardBtnDiv">
          <Button variant="secondary" >Details</Button>
          <Button variant="warning">Add To Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProducrCard;
