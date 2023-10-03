import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import EditProductCardComponent from "../components/EditProductCardComponent";
import AdminProductInput from "../components/AdminProductInput";
import Button from "react-bootstrap/Button";
import CommentComponent from "../components/CommentComponent";
import thumbUp from "../assets/icons/thumb-up.png";
import thumpDown from "../assets/icons/thumb-down.png";
import AlertMessage from "../components/AlertComponent";

export default function AdminProductPage() {
  return (
    <div className="adminOrderPage">
      <h1 className="pageTitle">Manage Products</h1>
      <Outlet />
    </div>
  );
}

export function AdminProductList() {
  const [products, setProdsucts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/products/").then((response) => {
      setProdsucts(response.data.data);
    });
  }, []);

  return (
    <div className="cartList">
      {products.map((product) => (
        <EditProductCardComponent
          key={product.id}
          id={product.id}
          picFile={"http://localhost:8080/" + product.picFile}
          barcode={product.barcode}
          price={product.price}
          unit={product.unit}
          stock={product.stock}
          avaliable={product.available}
        />
      ))}
    </div>
  );
}

export function AdminProductDetail() {
  const { productid } = useParams();
  const [product, setProduct] = useState();
  const [edit, setEdit] = useState(false);
  const [changed, setChanged] = useState(false);

  const [showAlert , setShowAlert] = useState(false)
  const [heading , setAlertHeading] = useState()

  useEffect(() => {
    axios
      .get("http://localhost:8080/products/byId/" + productid)
      .then((response) => {
        setProduct(response.data.data);
      });
  }, [changed]);

  function handleChanged() {
    setChanged(!changed);
  }

  function handleEdit() {
    setEdit(true);
  }
  function handleTest() {
    console.log(product.comments);
  }

  function handleResetLike(){
    axios.delete("http://localhost:8080/rates/resetLike/"+productid)
    .then(() => {
        setShowAlert(true)
        setAlertHeading("Like rating resetted")
    })
  }

  function handleResetUnlike(){
    axios.delete("http://localhost:8080/rates/resetUnlike/"+productid)
    .then(() => {
        setShowAlert(true)
        setAlertHeading("Unlike rating resetted")
    })
  }

  return (
    <div className="detailDiv">
      {product ? (
        edit ? (
          <AdminProductInput
            id={product.id}
            productNameInit={product.name}
            barCodeInit={product.barcode}
            categoryInit={product.category}
            priceInit={product.price}
            unitInit={product.unit}
            stockInit={product.stock}
            descriptInit={product.description}
            checkInit={product.available}
          />
        ) : (
          <div>
            <h3>{product.name}</h3>
            <h4>{product.barcode}</h4>
            <h3>{product.category}</h3>
            <h3>
              ${product.price} / {product.unit}
            </h3>
            <h3>{product.stock}</h3>
            <Button variant="dark" onClick={handleEdit}>
              Edit
            </Button>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleTest}>test</button>
      <div className="adminRateDiv">
        <h5>Reset Ratings</h5>
        <div className="rateInput">
          <Button variant="light">
            <img src={thumbUp} style={{ width: "24px", height: "24px" }} onClick={handleResetLike}/>
          </Button>
          <Button variant="light">
            <img src={thumpDown} style={{ width: "24px", height: "24px" }} onClick={handleResetUnlike}/>
          </Button>
        </div>
        <AlertMessage
        show={showAlert}
        onClose={() => setShowAlert(false)}
        variant="primary"
        heading={heading}
        className="primary"
      />
      </div>
      <div className="commentsDiv">
        {product && product.comments
          ? product.comments.map((comment) => (
              <CommentComponent
                id={comment.id}
                key={comment.id}
                time={comment.createdAt}
                body={comment.body}
                onChange={handleChanged}
              />
            ))
          : null}
      </div>
    </div>
  );
}
