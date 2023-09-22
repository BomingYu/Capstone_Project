import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import useInputData from "../hooks/useInputData";
import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const userEmail = useInputData("");
  const userPassword = useInputData("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (userEmail.value != "" || userPassword.value != "") {
      const userData = { email: userEmail.value, password: userPassword.value };

      axios
        .post("http://localhost:8080/users/login", userData)
        .then((response) => {
          if (response.data.result == 200) {
            console.log("login successful: ", response.data.data);
            const currentUser = response.data.data;
            console.log(currentUser.userName);
            setUser(currentUser);
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response.status == 400) {
            setErrorMessage(error.response.data);
          }
          if (error.response.status == 404) {
            setErrorMessage(error.response.data);
          } else {
            setErrorMessage(error.response.data)
          }
        });
    }
    else{
      setErrorMessage("Please enter email and password to login.")
    }
  };

  return (
    <div className="userInputDiv">
      <div>
        <p className="errorMessage">{errorMessage}</p>
      </div>
      <Form className="loginForm" onSubmit={handleLogin}>
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
        <Button variant="light" id="componentBtn" type="submit">
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
