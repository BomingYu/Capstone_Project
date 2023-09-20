import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SignupComponent() {
  return (
    <div>
      <Form className="signupForm">
        <Form.Control type="text" placeholder="User Name" className="componnetText"/>
        <div className="signupwidgesDiv">
          <Form.Control type="text" placeholder="First Name" className="componnetText"/>
          <Form.Control type="text" placeholder="Last Name" className="componnetText"/>
        </div>
        <div className="signupwidgesDiv">
          <Form.Control type="password" placeholder="Password" className="componnetText"/>
          <Form.Control type="password" placeholder="Re-password" className="componnetText"/>
        </div>
        <Form.Control type="email" placeholder="name@example.com" className="componnetText"/>
        <Button variant="light" id="componentBtn">
          Signup
        </Button>
      </Form>
    </div>
  );
}

export default SignupComponent;
