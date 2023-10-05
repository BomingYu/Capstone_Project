import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useUserContext } from "../contexts/userContext";

const CommentComponent = ({id, time , body , onChange}) => {

  const {user} = useUserContext();

  function isEmptyObj(){
    const propertise = Object.keys(user)
    if(propertise.length == 0){
      return true
    }
    else{
      return false
    }
  }

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
        {!isEmptyObj() && user.role == "admin" ? <Button variant="danger" onClick={handleDeleteComment}>Delete This Comment</Button> : null}
      </Card.Body>
    </Card>
  );
};

export default CommentComponent;
