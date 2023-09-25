import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo/logo.png";
import { useUserContext } from "../contexts/userContext";

function NavBar() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

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
              <NavLink className="navBarText navDropdownItem">Category</NavLink>
              <NavDropdown.Divider />
              <NavLink className="navBarText navDropdownItem">
                All Products
              </NavLink>
            </NavDropdown>

            {user ? (
              <NavDropdown title="My Account" className="navBarText">
                <NavLink
                  className="navBarText navDropdownItem"
                  to={"/settingPassword"}
                >
                  Setting
                </NavLink>
                <NavDropdown.Divider />
                <NavLink
                  className="navBarText navDropdownItem"
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

            <NavDropdown title="Admin" className="navBarText">
              <NavLink
                className="navBarText navDropdownItem"
                to={"/adminProduct/add"}
              >
                New Product
              </NavLink>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
