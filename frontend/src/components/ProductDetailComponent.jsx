import thumbUp from "../assets/icons/thumb-up.png";
import thumpDown from "../assets/icons/thumb-down.png";
import Button from 'react-bootstrap/Button';

const ProductDetailComponent = () => {
  return (
    <div className="productDetail">
      <img
        src="https://ctan.math.illinois.edu/macros/latex/contrib/incgraph/example.jpg"
        className="productDetailPic"
      />
      <h2>title</h2>
      <h3>$Price / Unit</h3>
      <div className="detailWeidges">
        <div className="thumbsDivInDetail">
          <img src={thumbUp} style={{ width: "24px", height: "24px" }} />
          <span>X</span>
          <img src={thumpDown} style={{ width: "24px", height: "24px" }} />
          <span>Y</span>
        </div>
        <Button variant="warning">Add To Cart</Button>
      </div>
      <p>Description</p>
    </div>
  );
};

export default ProductDetailComponent;
