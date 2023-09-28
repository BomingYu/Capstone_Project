import { useEffect, useState } from "react";
import CartComponent from "../components/CartComponent";
import { useUserContext } from "../contexts/userContext";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ascendingNameSort = (arr) => {
  const sortedOutput = [...arr].sort((a, b) => {
    const nameA = a.product.name.toLowerCase();
    const nameB = b.product.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sortedOutput;
};
const descendingNameSort = (arr) => {
  const sortedOutput = [...arr].sort((a, b) => {
    const nameA = a.product.name.toLowerCase();
    const nameB = b.product.name.toLowerCase();
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
  });
  return sortedOutput;
};

function CartPage() {
  const { user } = useUserContext();
  const [cartProduct, setCartProduct] = useState([]);
  const [displayCart , setDisplayCart] = useState([])
  const [state, setState] = useState(false);

  useEffect(() => {
    if (user) {
      axios.get("http://localhost:8080/carts/" + user.id).then((response) => {
        //console.log(response.data.data);
        setCartProduct(response.data.data);
        setDisplayCart(response.data.data)
      });
    }
  }, [state]);

  const handlePayBtn = () => {
    console.log(cartProduct[0].product);
  };

  const handleDelete = (cartid) => {
    console.log(cartid);
    axios
      .delete("http://localhost:8080/carts/delete/" + cartid)
      .then((response) => {
        console.log("Done");
        setState(!state);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleAscending = () => {
    setDisplayCart(ascendingNameSort(displayCart))
  }
  const handleDescending = () => {
    setDisplayCart(descendingNameSort(displayCart))
  }
  const handleDefault = () => {
    setDisplayCart(cartProduct)
  }

  return (
    <div className="cartPage">
      <h1 className="pageTitle">My Cart</h1>
      <div className="cartPageDropdowns">
        {/* <DropdownButton
          id="dropdown-basic-button"
          title="Category"
          variant="secondary"
        >
          <Dropdown.Item>All</Dropdown.Item>
          <Dropdown.Item>Fruit</Dropdown.Item>
          <Dropdown.Item>Vegetable</Dropdown.Item>
          <Dropdown.Item>Dairy</Dropdown.Item>
          <Dropdown.Item>Seasoning</Dropdown.Item>
          <Dropdown.Item>Drink</Dropdown.Item>
          <Dropdown.Item>Misc</Dropdown.Item>
        </DropdownButton> */}
        <DropdownButton
          id="dropdown-basic-button"
          title="Sort"
          variant="secondary"
        >
            <Dropdown.Item onClick={handleDefault}>Default</Dropdown.Item>
          <Dropdown.Item onClick={handleAscending}>Ascending Order by Name</Dropdown.Item>
          <Dropdown.Item onClick={handleDescending}>Descending Order by Name</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="cartList">
        {displayCart.map((item) => {
          const picFile = "http://localhost:8080/" + item.product.picFile;
          const name = item.product.name;
          const price = item.product.price;
          const unit = item.product.unit;
          const stock = item.product.stock;
          const quantity = item.quantity;
          const subtotal = (Number(price) * Number(quantity)).toFixed(2);
          return (
            <CartComponent
              id={item.id}
              key={item.id}
              picFile={picFile}
              name={name}
              price={price}
              unit={unit}
              stock={stock}
              quantity={quantity}
              subtotal={subtotal}
              onDelete={() => handleDelete(item.id)}
            />
          );
        })}
      </div>
      <Button variant="light" onClick={handlePayBtn}>
        Pay
      </Button>
    </div>
  );
}

export default CartPage;
