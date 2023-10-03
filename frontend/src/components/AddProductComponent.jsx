import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import useInputData from "../hooks/useInputData";
import axios from "axios";
import AlertMessage from "./AlertComponent";

const AddProductComponent = () => {
  const [productName , clearProductName] = useInputData("");
  const [barcode , clearBarcode] = useInputData("");
  const [category, setCategory] = useState("");
  const [price , clearPrice] = useInputData("");
  const [unit, setUnit] = useState("");
  const [stock , clearStock] = useInputData("");
  const [description , clearDescription] = useInputData("");
  const [image, setImage] = useState({ preview: "", data: "" });
  const [isChecked, setIsChecked] = useState(true);

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState();
  const [alertHeading, setAlertHeading] = useState();

  const clearInputs = () => {
    clearProductName();
    clearBarcode();
    setCategory("")
    clearPrice();
    setUnit("")
    clearStock();
    clearDescription();
    const fileInput = document.getElementById("fileInput");
    fileInput.value = "";
    setImage({ preview: "", data: "" });
  };

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleUnit = (e) => {
    setUnit(e.target.value);
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleAddNewProduct = (e) => {
    e.preventDefault();

    if (
      productName.value == "" ||
      category == "" ||
      price.value == "" ||
      unit == ""
    ) {
      setAlertVariant("danger");
      setAlertHeading(
        "Product Name, Category, Price and Unit Cannot Be Empty!"
      );
      setShowAlert(true);
    } else {
      const formData = new FormData();
      formData.append("name", productName.value);
      formData.append("barcode", barcode.value);
      formData.append("category", category);
      formData.append("price", price.value);
      formData.append("unit", unit);
      formData.append("stock", stock.value);
      formData.append("description", description.value);
      formData.append("file", image.data);
      formData.append("available", isChecked);

      axios
        .post("http://localhost:8080/products/add", formData)
        .then((response) => {
           clearInputs();
           setAlertVariant("primary");
           setAlertHeading(
             `${response.data.data.name} has been added successfully!`
           );
           setShowAlert(true);
        })
        .catch((error) => {
          if (error.response) {
            setAlertVariant("danger");
            setAlertHeading(error.response.data);
            setShowAlert(true);
          }
        });
    }
  };

  return (

      <Form onSubmit={handleAddNewProduct} className="addNewProductForm">
        <Form.Control
          type="text"
          placeholder="Product Name"
          className="componnetText"
          {...productName}
        />
        <Form.Control
          type="text"
          placeholder="Barcode"
          className="componnetText"
          {...barcode}
        />
        <Form.Select
          className="componnetText"
          value={category}
          onChange={handleCategory}
        >
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
            {...price}
          />
          <InputGroup.Text id="basic-addon1" className="componnetText">
            /
          </InputGroup.Text>
          <Form.Select
            className="componnetText"
            value={unit}
            onChange={handleUnit}
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
          {...stock}
        />
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Description..."
          className="componnetText"
          {...description}
        />

        <Form.Label className="componnetText">
          Procut Picture
          <Form.Control
            type="file"
            className="componnetText"
            id="fileInput"
            onChange={handleFileChange}
          />
        </Form.Label>
        <Form.Check
          type="checkbox"
          id="custom-switch"
          label="Product Available"
          className="componnetText"
          checked={isChecked}
          onChange={handleCheckBox}
        />
        <Button variant="light" id="componentBtn" type="submit">
          Add
        </Button>
        <div>
          <AlertMessage
            show={showAlert}
            onClose={() => setShowAlert(false)}
            variant={alertVariant}
            heading={alertHeading}
            className={alertVariant}
          ></AlertMessage>
        </div>
      </Form>
  );
};

export default AddProductComponent;
