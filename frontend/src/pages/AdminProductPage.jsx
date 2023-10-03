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
import Dropdown from "react-bootstrap/Dropdown";

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

  function handleDisplatCategory(categ){
    axios.get("http://localhost:8080/products/byCategory/"+categ)
    .then((response) => {
      setProdsucts(response.data.data);
    });
  }

  function handleDisplayAvailable(available){
    axios.get("http://localhost:8080/products/getProductsByAvailable/"+available)
    .then((response) => {
      setProdsucts(response.data.data);
    });
  }

  function handleDisplayAll(){
    axios.get("http://localhost:8080/products/").then((response) => {
      setProdsucts(response.data.data);
    });
  }
  return (
    <div className="adminOrderPageBody">
      <div className="dropdownDiv">
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            By Category
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>handleDisplatCategory("fruit")}>
              Fruit
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>handleDisplatCategory("vegetable")}>
              Vegetable
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>handleDisplatCategory("dairy")}>
              Dairy
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>handleDisplatCategory("seasoning")}>
              Seasoning
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>handleDisplatCategory("drink")}>
              Drink
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>handleDisplatCategory("misc")}>
              Misc
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            By Available
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>handleDisplayAvailable(1)}>
            Available
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>handleDisplayAvailable(0)}>
            Unavailable
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button variant="dark" onClick={handleDisplayAll}>All</Button>
      </div>
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
    </div>
  );
}

export function AdminProductDetail() {
  const { productid } = useParams();
  const [product, setProduct] = useState();
  const [edit, setEdit] = useState(false);
  const [changed, setChanged] = useState(false);
  const [productComments , setComments] = useState()

  const [showAlert , setShowAlert] = useState(false)
  const [heading , setAlertHeading] = useState()

  useEffect(() => {
    axios
      .get("http://localhost:8080/products/byId/" + productid)
      .then((response) => {
        setProduct(response.data.data);
        setComments(response.data.data.comments.reverse())
      });
  }, [changed]);

  function handleChanged() {
    setChanged(!changed);
  }

  function handleEdit() {
    setEdit(true);
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
          ? productComments.map((comment) => (
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
