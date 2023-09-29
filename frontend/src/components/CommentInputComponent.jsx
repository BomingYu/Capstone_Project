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

  const [showRateAlert, setShowRateAlert] = useState(false);
  const [rateAlertVariant , setRateAlertVariant] = useState();

  const setRate = (rateValue) => {
    console.log(userid);
      console.log(productid);
  
      const rateData = {
        userid:userid,
        productid:productid,
        rate: rateValue
      };
  
      console.log(rateData);
      axios.post("http://localhost:8080/rates/setRate" , rateData)
      .then((resposne) => {
        console.log(resposne)
        setRateAlertVariant("primary")
        setShowRateAlert(true)
      })
      .catch((error) => {
         if (error.response) {
          console.error("Axios error:", error.message);
        } else {
          console.error("Network error:", error);
        }
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userid);
    console.log(productid);
    console.log(comment.value);

    if (comment.value !== "") {
      const commentData = {
        userid: userid,
        productid: productid,
        body: comment.value,
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
            console.log(error);
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
      />
      <div className="rateDiv">
        <div className="rateInput">
          <Button variant="light" onClick={() => setRate("up")}>
            <img src={thumbUp} style={{ width: "24px", height: "24px" }} />
          </Button>
          <Button variant="light" onClick={() => setRate("down")}>
            <img src={thumpDown} style={{ width: "24px", height: "24px" }} />
          </Button>
        </div>
        <AlertMessage
        show={showRateAlert}
        onClose={() => setShowRateAlert(false)}
        variant={rateAlertVariant}
        heading="Rated!"
        className={rateAlertVariant}
      />
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
