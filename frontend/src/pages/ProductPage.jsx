import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProducrCard from "../components/ProductCard";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import ProductDetailComponent from "../components/ProductDetailComponent";
import CommentInputComponent from "../components/CommentInputComponent";
import CommentComponent from "../components/CommentComponent";
import { useUserContext } from "../contexts/userContext";

const ascendingNameSort = (arr) => {
  const sortedOutput = [...arr].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sortedOutput;
};
const descendingNameSort = (arr) => {
  const sortedOutput = [...arr].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
  });
  return sortedOutput;
};
const fromLowPrice = (arr) => {
  const sortedOutput = [...arr].sort((a, b) => a.price - b.price);
  return sortedOutput;
};
const fromHighPrice = (arr) => {
  const sortedOutput = [...arr].sort((a, b) => b.price - a.price);
  return sortedOutput;
};

export default function ProductPage() {
  return (
    <div className="productPage">
      <Outlet />
    </div>
  );
}

const getUpCount = (arr) => {
  let count = 0;
  if (!arr || arr.length === 0) {
    return 0;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].rate == "up") {
      count++;
    }
  }
  return count;
};
const getDownCount = (arr) => {
  let count = 0;
  if (!arr || arr.length === 0) {
    return 0;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].rate == "down") {
      count++;
    }
  }
  return count;
};

export function AllProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data.data);
        setDisplayProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = displayProducts.slice(
    firstProductIndex,
    lastProductIndex
  );
  const maxPage = Math.ceil(displayProducts.length / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= maxPage) {
      setCurrentPage(newPage);
    }
  };
  const handleAscending = () => {
    setDisplayProducts(ascendingNameSort(products));
  };
  const handleDescending = () => {
    setDisplayProducts(descendingNameSort(products));
  };
  const handleFromLowPrice = () => {
    setDisplayProducts(fromLowPrice(products));
  };
  const handleFromHighPrice = () => {
    setDisplayProducts(fromHighPrice(products));
  };
  return (
    <div className="productListPageBody">
      <h1>All Products</h1>
      <div className="dropdownBtns">
        <DropdownButton
          id="dropdown-basic-button"
          title="Sort"
          variant="secondary"
        >
          <Dropdown.Item onClick={handleAscending}>
            Ascending Order by Name
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDescending}>
            Descending Order by Name
          </Dropdown.Item>
          <Dropdown.Item onClick={handleFromLowPrice}>
            From Lowest Price
          </Dropdown.Item>
          <Dropdown.Item onClick={handleFromHighPrice}>
            From Highest Price
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="productList">
        {currentProducts.map((product) => (
          <ProducrCard
            id={product.id}
            key={product.id}
            picUrl={"http://localhost:8080/" + product.picFile}
            title={product.name}
            price={product.price}
            unit={product.unit}
            up={getUpCount(product.rates)}
            down={getDownCount(product.rates)}
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

export function ProductByCategory() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products/byCategory/" + category)
      .then((response) => {
        setProducts(response.data.data);
        setDisplayProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [category]);

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = displayProducts.slice(
    firstProductIndex,
    lastProductIndex
  );
  const maxPage = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= maxPage) {
      setCurrentPage(newPage);
    }
  };
  const handleAscending = () => {
    setDisplayProducts(ascendingNameSort(products));
  };
  const handleDescending = () => {
    setDisplayProducts(descendingNameSort(products));
  };
  const handleFromLowPrice = () => {
    setDisplayProducts(fromLowPrice(products));
  };
  const handleFromHighPrice = () => {
    setDisplayProducts(fromHighPrice(products));
  };
  return (
    <div className="productListPageBody">
      <h1>{category} Products</h1>
      <div className="dropdownBtns">
        <DropdownButton
          id="dropdown-basic-button"
          title="Sort"
          variant="secondary"
        >
          <Dropdown.Item onClick={handleAscending}>
            Ascending Order by Name
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDescending}>
            Descending Order by Name
          </Dropdown.Item>
          <Dropdown.Item onClick={handleFromLowPrice}>
            From Lowest Price
          </Dropdown.Item>
          <Dropdown.Item onClick={handleFromHighPrice}>
            From Highest Price
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="productList">
        {currentProducts.map((product) => (
          <ProducrCard
            id={product.id}
            key={product.id}
            picUrl={"http://localhost:8080/" + product.picFile}
            title={product.name}
            price={product.price}
            unit={product.unit}
            up={getUpCount(product.rates)}
            down={getDownCount(product.rates)}
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

export function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [productComments , setComents] = useState([])
  const { user } = useUserContext();
  const [state , setState] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:8080/products/byId/" + id)
    .then((response) => {
      setProduct(response.data.data);
      setComents(response.data.data.comments.reverse())
    });
  }, [state]);

  const handleDelete = () => {
    setState(!state)
  };

  return (
    <div className="detailDiv">
      <ProductDetailComponent
        id = {product.id}
        picFile={product.picFile?"http://localhost:8080/" + product.picFile:""}
        name={product.name}
        price={product.price}
        unit={product.unit}
        description={product.description}
        up={getUpCount(product.rates)}
        down={getDownCount(product.rates)}
      />

      {user ? <CommentInputComponent userid={user.id} productid={product.id} /> : null}

        <div className="commentsDiv">
          {product.comments &&
            product.comments.length > 0 &&
            productComments.map((comment) => (
              <CommentComponent
                id={comment.id}
                key={comment.id}
                time={comment.createdAt}
                body={comment.body}
                onChange={handleDelete}
              />
            ))}
        </div>

    </div>
  );
}
