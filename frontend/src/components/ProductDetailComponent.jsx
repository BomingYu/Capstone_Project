import thumbUp from "../assets/icons/thumb-up.png";
import thumpDown from "../assets/icons/thumb-down.png";
import Button from 'react-bootstrap/Button';

const ProductDetailComponent = ({picFile , name , price , unit , description , up , down}) => {
  return (
    <div className="productDetail">
      <img
        src={picFile}
        className="productDetailPic"
      />
      <h2>{name}</h2>
      <h3>$ {price} / {unit}</h3>
      <div className="detailWeidges">
        <div className="thumbsDivInDetail">
          <img src={thumbUp} style={{ width: "24px", height: "24px" }} />
          <span>{up}</span>
          <img src={thumpDown} style={{ width: "24px", height: "24px" }} />
          <span>{down}</span>
        </div>
        <Button variant="warning">Add To Cart</Button>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default ProductDetailComponent;
