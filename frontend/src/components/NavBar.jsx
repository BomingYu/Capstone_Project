import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo/logo.png";

function NavBar() {
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
              <NavDropdown.Item className="navBarText navDropdownItem">
                Category
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="navBarText navDropdownItem">
                All Products
              </NavDropdown.Item>
            </NavDropdown>

            <NavLink className="navBarText" to={"/login"}>Login</NavLink>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
