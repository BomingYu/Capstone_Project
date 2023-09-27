import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import thumbUp from "../assets/icons/thumb-up.png";
import thumpDown from "../assets/icons/thumb-down.png";
import useInputData from "../hooks/useInputData";
import AlertMessage from "./AlertComponent";
import { useState } from "react";
import axios from "axios";

const CommentInputComponent = ({ userid, productid }) => {
  const [comment, clearComment] = useInputData("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState();
  const [alertHeading, setAlertHeading] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userid);
    console.log(productid);
    console.log(comment.value);

    if (comment.value !== "") {
      const commentData = {
        userid: userid,
        productid: productid,
        body: comment.value
      };
      axios
        .post("http://localhost:8080/comments/addComment", commentData)
        .then((response) => {
          clearComment();
          setAlertVariant("primary");
          setAlertHeading("Your comment is submited successfully!");
          setShowAlert(true);
        })
        .catch((error) => {
          if (error.response) {
            // setAlertVariant("danger");
            // setAlertHeading(error);
            // setShowAlert(true);
            console.log(error)
          }
        });
    } else {
      setAlertVariant("danger");
      setAlertHeading("Your comment cannot be empty!");
      setShowAlert(true);
    }
  };
  return (
    <div className="commentInputDiv">
      <AlertMessage
        show={showAlert}
        onClose={() => setShowAlert(false)}
        variant={alertVariant}
        heading={alertHeading}
        className={alertVariant}
      ></AlertMessage>
      <div className="rateInput">
        <Button variant="light">
          <img src={thumbUp} style={{ width: "24px", height: "24px" }} />
        </Button>
        <Button variant="light">
          <img src={thumpDown} style={{ width: "24px", height: "24px" }} />
        </Button>
      </div>
      <Form className="commentInputForm" onSubmit={handleSubmit}>
        <Form.Control
          as="textarea"
          placeholder="Your Comment"
          rows={3}
          {...comment}
        />
        <Button variant="light" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CommentInputComponent;
