import Card from "react-bootstrap/Card";

const CommentComponent = () => {
  return (
    <Card className="commentCard">
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CommentComponent;
