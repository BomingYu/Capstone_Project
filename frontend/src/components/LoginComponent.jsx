import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import useInputData from "../hooks/useInputData";
import axios from "axios";
import { useState } from "react";

function LoginComponent() {
  const userEmail = useInputData("");
  const userPassword = useInputData("");
  const [errorMessage , setErrorMessage] = useState("")

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = {email : userEmail.value , password : userPassword.value};

    axios.post("http://localhost:8080/users/login" , userData)
    .then(response => {
      if(response.data.result == 200){
        console.log("login successful: " , response.data);
      }
      if(response.data.result == 500){
        setErrorMessage("Invalid email or password, please try again.")
      }
    })
    .catch(error => {
      setErrorMessage("Some unkown error happened, please try later.")
    })
  }

  return (
    <div className="userInputDiv">
      <div><p className="errorMessage">{errorMessage}</p></div>
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
