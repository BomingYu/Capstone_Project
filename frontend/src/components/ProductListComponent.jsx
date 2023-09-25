import { useState, useEffect } from "react";
import ProducrCard from "./ProductCard";
import Button from "react-bootstrap/Button";
import axios from "axios";

function ProductListComponent() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data.data);
        window.requestAnimationFrame(() => {
          window.scrollTo(0, 0);
        });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);
  const maxPage = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage) => {
    if(newPage>=1 && newPage<=maxPage){
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="productListPageBody">
      <div className="productList">
        {currentProducts.map((product) => (
          <ProducrCard
            key={product.id}
            picUrl={"http://localhost:8080/" + product.picFile}
            title={product.name}
            price={product.price}
            unit={product.unit}
          />
        ))}
      </div>
      <div className="pagination">
        <Button
          variant="light"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        {Array.from({
          length: Math.ceil(products.length / productsPerPage),
        }).map((_, index) => (
          <Button
            key={index}
            variant="light"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="light"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ProductListComponent;
