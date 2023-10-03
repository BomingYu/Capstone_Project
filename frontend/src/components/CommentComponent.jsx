import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import axios from "axios";

const CommentComponent = ({id, time , body , onChange}) => {

  function handleDeleteComment(){
    onChange()
    axios.delete("http://localhost:8080/comments/"+id)
  }

  return (
    <Card className="commentCard">
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{time}</Card.Subtitle>
        <Card.Text>
          {body}
        </Card.Text>
        <Button variant="danger" onClick={handleDeleteComment}>Delete This Comment</Button>
      </Card.Body>
    </Card>
  );
};

export default CommentComponent;
