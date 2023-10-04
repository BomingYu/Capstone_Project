import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import useInputData from "../hooks/useInputData";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
    const [searchInput] = useInputData("")
    const navigate = useNavigate()

    function handleSearchProduct(){
        console.log(searchInput.value)
        if(searchInput.value == ""){
            console.log("empty")
            navigate("/products");
        }
        else{
            console.log("not empty")
            navigate("/products/searchProduct/"+searchInput.value);
        }
    }
  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Product"
        aria-label="Product"
        aria-describedby="basic-addon2"
        {...searchInput}
      />
      <Button variant="success" id="button-addon2" onClick={handleSearchProduct}>
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchComponent;
