import useInputData from "../hooks/useInputData";
import { useUserContext } from "../contexts/userContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AlertMessage from "./AlertComponent";
import { useState } from "react";
import axios from "axios";

function SettingPasswordComponent() {
  const { user } = useUserContext();

  const pwordInput = useInputData("");
  const newPword = useInputData("");
  const reNewPword = useInputData("");

  const [errorMessage, setErrorMessage] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");

  const clearInputs = () => {
    pwordInput.clearInput();
    newPword.clearInput();
    reNewPword.clearInput();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = user.id;
    const password = pwordInput.value;
    const newPassword = newPword.value;
    const reNewPassword = reNewPword.value;

    if (newPassword !== reNewPassword) {
      setAlertVariant("danger");
      setAlertHeading("Two new passwords do not match!");
      setShowAlert(true);
    }
    if (newPassword == "" || reNewPassword == "") {
      setAlertVariant("danger");
      setAlertHeading("The new password cannot be empty!");
      setShowAlert(true);
    }
    if (newPassword === reNewPassword) {
      const newData = { oldPasswor: password, newPassword: newPassword };
      axios
        .put("http://localhost:8080/users/" + id, newData)
        .then((response) => {
          setAlertVariant("primary");
          setAlertHeading("Password updated successfully!");
          setShowAlert(true);
          clearInputs();
          setErrorMessage("");
        })
        .catch((error) => {
          if (error.response) {
            setAlertVariant("danger");
            setAlertHeading(error.response.data);
            setShowAlert(true);
            //setErrorMessage(error.response.data)
          }
        });
    }
  };

  return (
    <div className="userInputDiv">
      <div>
          <AlertMessage
            show={showAlert}
            onClose={() => setShowAlert(false)}
            variant={alertVariant}
            heading={alertHeading}
          ></AlertMessage>
        </div>
      <Form className="userSettingForm" onSubmit={handleSubmit}>
        <Form.Control
          type="password"
          className="componnetText"
          placeholder="Old Password"
          {...pwordInput}
        />
        <Form.Control
          type="password"
          className="componnetText"
          placeholder="New Password "
          {...newPword}
        />
        <Form.Control
          type="password"
          className="componnetText"
          placeholder="Re-New Password"
          {...reNewPword}
        />
        
        <Button variant="light" id="componentBtn" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default SettingPasswordComponent;
