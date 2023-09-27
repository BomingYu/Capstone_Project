import Card from "react-bootstrap/Card";

const CommentComponent = ({time , body}) => {
  return (
    <Card className="commentCard">
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{time}</Card.Subtitle>
        <Card.Text>
          {body}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CommentComponent;
