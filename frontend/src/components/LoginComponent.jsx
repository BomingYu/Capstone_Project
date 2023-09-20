import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function LoginComponent() {
  return (
    <div>
      <Form className="loginForm">
        <Form.Control
          type="email"
          placeholder="name@example.com"
          className="componnetText"
        />
        <Form.Control
          type="password"
          placeholder="Password"
          className="componnetText"
        />
        <Button variant="light" id="componentBtn">
          Login
        </Button>
      </Form>
      <div className="loginWidgesDiv">
        <Link className="loginWidges" to={"/signup"}>
          Create an Account
        </Link>
        <Link className="loginWidges" to={"https://www.google.co.nz/"}>
          Forget Password?
        </Link>
      </div>
    </div>
  );
}

export default LoginComponent;
