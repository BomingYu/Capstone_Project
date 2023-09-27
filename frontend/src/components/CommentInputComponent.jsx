import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import thumbUp from "../assets/icons/thumb-up.png";
import thumpDown from "../assets/icons/thumb-down.png";

const CommentInputComponent = () => {
  return (
    <div className="commentInputDiv">
      <div className="rateInput">
        <Button variant="light">
          <img src={thumbUp} style={{ width: "24px", height: "24px" }} />
        </Button>
        <Button variant="light">
          <img src={thumpDown} style={{ width: "24px", height: "24px" }} />
        </Button>
      </div>
      <Form className="commentInputForm">
        <Form.Control as="textarea" placeholder="Your Comment" rows={3} />
        <Button variant="light">Submit</Button>
      </Form>
    </div>
  );
};

export default CommentInputComponent;
