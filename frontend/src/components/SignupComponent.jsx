import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import userInputData from "../hooks/useInputData";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupComponent() {
  const [userNameInput , clearUserName] = userInputData("");
  const [firstNameInput , clearFirstName] = userInputData("");
  const [lastNameInput , clearLastName] = userInputData("");
  const [pwordInput , clearPassword] = userInputData("");
  const [rePwordInput , clearRePword] = userInputData("");
  const [emailInput , clearEmail] = userInputData("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigat = useNavigate();

  const clearInputs = () => {
    clearUserName();
    clearFirstName();
    clearLastName();
    clearPassword();
    clearRePword()
    clearEmail();
  }

  function handleSignup(e) {
    e.preventDefault();

    const username = userNameInput.value;
    const firstname = firstNameInput.value;
    const lastname = lastNameInput.value;
    const password = pwordInput.value;
    const renassword = rePwordInput.value;
    const email = emailInput.value;

    if (
      username != "" ||
      firstname != "" ||
      lastname != "" ||
      password != "" ||
      email != ""
    ) {
      if (password == renassword) {
        const newUserData = {
          userName: username,
          firstName: firstname,
          lastName: lastname,
          password: password,
          email: email,
        };
        axios
          .post("http://localhost:8080/users/signup", newUserData)
          .then((response) => {
            if(response.data.result == 500){
              console.log("Registration successful:", response.data.data.errors[0].message);
              const errorMessage=`${email} already exists. ${response.data.data.errors[0].message}.`
              setErrorMessage(errorMessage);
              clearInputs();
            }
            if(response.data.result == 200){
              console.log("Registration successful:", response.data.data);
              navigat("/login");
            }
          })
          .catch((error) => {
            console.error("Registration failed:", error);
            clearInputs();
          });
      }
      else{
        setErrorMessage("Two password settings do not match!");
        clearInputs();
      }
    } else {
      setErrorMessage("All Textboxes are required!");
      clearInputs();
    }
  }
  return (
    <div className="userInputDiv">
      <div><p className="errorMessage">{errorMessage}</p></div>
      <Form className="signupForm" onSubmit={handleSignup}>
        <Form.Control
          type="text"
          placeholder="User Name"
          className="componnetText"
          {...userNameInput}
        />
        <div className="signupwidgesDiv">
          <Form.Control
            type="text"
            placeholder="First Name"
            className="componnetText"
            {...firstNameInput}
          />
          <Form.Control
            type="text"
            placeholder="Last Name"
            className="componnetText"
            {...lastNameInput}
          />
        </div>
        <div className="signupwidgesDiv">
          <Form.Control
            type="password"
            placeholder="Password"
            className="componnetText"
            {...pwordInput}
          />
          <Form.Control
            type="password"
            placeholder="Re-password"
            className="componnetText"
            {...rePwordInput}
          />
        </div>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          className="componnetText"
          {...emailInput}
        />
        <Button variant="light" id="componentBtn" type="submit">
          Signup
        </Button>
      </Form>
    </div>
  );
}

export default SignupComponent;
