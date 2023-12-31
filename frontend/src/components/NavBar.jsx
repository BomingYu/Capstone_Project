import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo/logo.png";
import basket from "../assets/icons/basket.png";
import { useUserContext } from "../contexts/userContext";
import SearchComponent from "./SearchComponent";

function NavBar() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({});
    navigate("/");
  };

  function isEmptyObj(){
    const propertise = Object.keys(user)
    if(propertise.length == 0){
      return true
    }
    else{
      return false
    }
  }

  return (
    <Navbar expand="lg" className="navBar">
      <Container className="navBarContainer">
        <Navbar.Brand>
          <NavLink to={"/"}>
            <img src={logo} alt="Our Logo" height="150" className="logo" />
          </NavLink>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navBarList">
            <NavDropdown title="Products" className="navBarText">
              <NavLink
                className="navBarText navDropDownItem"
                to={"/products/byCategory/Fruit"}
              >
                Fruit
              </NavLink>
              <br />
              <NavLink
                className="navBarText navDropDownItem"
                to={"/products/byCategory/Vegetable"}
              >
                Vegetable
              </NavLink>
              <br />
              <NavLink
                className="navBarText navDropDownItem"
                to={"/products/byCategory/Dairy"}
              >
                Dairy
              </NavLink>
              <br />
              <NavLink
                className="navBarText navDropDownItem"
                to={"/products/byCategory/Seasoning"}
              >
                Seasoning
              </NavLink>
              <br />
              <NavLink
                className="navBarText navDropDownItem"
                to={"/products/byCategory/Drink"}
              >
                Drink
              </NavLink>
              <br />
              <NavLink
                className="navBarText navDropDownItem"
                to={"/products/byCategory/Misc"}
              >
                Misc
              </NavLink>
              <NavDropdown.Divider />
              <NavLink className="navBarText navDropDownItem" to={"/products"}>
                All Products
              </NavLink>
            </NavDropdown>

            {!isEmptyObj() ? (
              <NavDropdown title="My Account" className="navBarText">
                <NavLink
                  className="navBarText navDropDownItem"
                  to={"/settingPassword"}
                >
                  Setting
                </NavLink>
                <NavDropdown.Divider />
                <NavLink
                  className="navBarText navDropDownItem"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </NavDropdown>
            ) : (
              <NavLink className="navBarText" to={"/login"}>
                Login
              </NavLink>
            )}

            {!isEmptyObj() ? (
              <NavLink className="navBarText" to={"/myorders/" + user.id}>
                My Orders
              </NavLink>
            ) : null}
            {!isEmptyObj() && user.role == "admin" ? (
              <NavDropdown title="Admin" className="navBarText">
                <NavLink
                  className="navBarText navDropDownItem"
                  to={"/adminProducts"}
                >
                  Edit Products
                </NavLink>
                <br />
                <NavLink
                  className="navBarText navDropDownItem"
                  to={"/adminProduct/add"}
                >
                  New Product
                </NavLink>
                <br />
                <NavLink
                  className="navBarText navDropDownItem"
                  to={"/adminOrders"}
                >
                  Admin Orders
                </NavLink>
              </NavDropdown>
            ) : null}
          </Nav>
          <div className="navBarLeftSide">
              <SearchComponent className="navBarText" />

            {!isEmptyObj() ? (
              <NavLink className="navBarText myCartLink" to={"/carts"}>
                <img src={basket} alt="My Cart" className="myCartBasket logo" />
              </NavLink>
            ) : null}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
