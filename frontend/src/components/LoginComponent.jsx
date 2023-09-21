import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import useInputData from "../hooks/useInputData";

function LoginComponent() {
  const userEmail = useInputData("");
  const userPassword = useInputData("");

  const handleLogin = () => {
    alert(userEmail.value + "==" + userPassword.value);
  }

  return (
    <div>
      <Form className="loginForm">
        <Form.Control
          type="email"
          placeholder="name@example.com"
          className="componnetText"
          {...userEmail}
        />
        <Form.Control
          type="password"
          placeholder="Password"
          className="componnetText"
          {...userPassword}
        />
        <Button variant="light" id="componentBtn" onClick={handleLogin}>
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
