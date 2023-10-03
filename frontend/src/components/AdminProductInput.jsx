import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import useInputData from "../hooks/useInputData";
import { useState } from "react";
import AlertMessage from "./AlertComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProductInput = ({id , productNameInit , barCodeInit , categoryInit , priceInit , unitInit , stockInit , descriptInit , checkInit}) => {
    const [productname , clearProductName] = useInputData(productNameInit)
    const [barcodeInput , clearBarcode] = useInputData(barCodeInit)
    const [category , setCategory] = useState(categoryInit)
    const [priceInput , clearPrice] = useInputData(priceInit)
    const [unit, setUnit] = useState(unitInit)
    const [stockInput , clearStock] = useInputData(stockInit)
    const [descriptInput , clearDescript] = useInputData(descriptInit)
    const [isChecked , setIscheck] = useState(checkInit)

    const [showAlert , setShowAlert] = useState(false)
    const [alerHeading , setAlertHeading] = useState()


    const navigate = useNavigate()

    function handleCategoryChange(e){
        setCategory(e.target.value)
    }
    function handleUnitChange(e){
        setUnit(e.target.value)
    }
    function handleAvaChange(){
        setIscheck(!isChecked)
    }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(productname.value)
    console.log(barcodeInput.value)
    console.log(category)
    console.log(priceInput.value)
    console.log(unit)
    console.log(stockInput.value)
    console.log(descriptInput.value)
    console.log(isChecked)
    if(productname.value!="" && priceInput.value!=""){
        const updateData = {
            name : productname.value,
            barcode : barcodeInput.value,
            category : category,
            price : priceInput.value,
            unit : unit,
            stock : stockInput.value,
            description : descriptInput.value, 
            available : isChecked
        }
        axios.put("http://localhost:8080/products/update/" + id , updateData)
        .then(response => {
            console.log("done")
            navigate("/adminProducts")
        })
        .catch(error => {
            console.log(error.data)
        })
    }
    else{
        setShowAlert(true)
        setAlertHeading("Product Name & Price cannot be empty")
    }
  }
  return (
    <div className="orderViewHead">
      <h4>Product Detail Edit</h4>
      <Form className="orderForm" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Product Name"
          className="componnetText"
          {...productname}
        />
        <Form.Control
          type="text"
          placeholder="Barcode"
          className="componnetText"
          {...barcodeInput}
        />
        <Form.Select className="componnetText" value={category} onChange={handleCategoryChange}>
          <option value="" disabled hidden>
            Choose a Category
          </option>
          <option>Fruit</option>
          <option>Vegetable</option>
          <option>Dairy</option>
          <option>Seasoning</option>
          <option>Drink</option>
          <option>Misc</option>
        </Form.Select>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className="componnetText">
            $
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Price"
            className="componnetText"
            {...priceInput}
          />
          <InputGroup.Text id="basic-addon1" className="componnetText">
            /
          </InputGroup.Text>
          <Form.Select
            className="componnetText"
            value={unit}
            onChange={handleUnitChange}
          >
            <option value="" disabled hidden>
              Choose a Unit
            </option>
            <option>KG</option>
            <option>EACH</option>
          </Form.Select>
        </InputGroup>
        <Form.Control
          type="text"
          placeholder="Stock"
          className="componnetText"
          {...stockInput}
        />
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Description..."
          className="componnetText"
          {...descriptInput}
        />
        <div className="checkDIV">
          <Form.Check
            type="checkbox"
            id="custom-switch"
            label="Available"
            className="componnetText"
            checked={isChecked}
            onChange={handleAvaChange}
          />
        </div>

        <AlertMessage
              show={showAlert}
              onClose={() => setShowAlert(false)}
              variant="danger"
              heading={alerHeading}
              className="danger"
            />
        <Button variant="light" type="submit" id="componentBtn">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default AdminProductInput;
