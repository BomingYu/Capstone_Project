import { useState, useEffect } from "react";
import ProducrCard from "./ProductCard";
import axios from "axios";
import Button from "react-bootstrap/Button";

function ProductListComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="productList">
      {products.map((product) => (
        <ProducrCard
          id={product.id}
          picUrl={"http://localhost:8080/" + product.picFile}
          title={product.name}
          price={product.price}
          unit={product.unit}
        />
      ))}
    </div>
  );
}

export default ProductListComponent;
