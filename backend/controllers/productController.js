const Model = require("../models");

const getAllProducts = (req, res) => {
  Model.Product.findAll({
    include: [
      {
        model: Model.Rate,
      },
    ],
  })
    .then((response) => {
      console.log(response);
      res.status(200).json({ result: 200, data: response });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ result: 500, data: error });
    });
};

const addNewProduct = (req, res) => {
  console.log(req.file.path);
  console.log(req.body.name);
  const productData = {
    name: req.body.name,
    barcode: req.body.barcode,
    category: req.body.category,
    price: req.body.price,
    unit: req.body.unit,
    stock: req.body.stock,
    description: req.body.description,
    picFile: req.file.path,
    available: req.body.available,
  };

  Model.Product.create(productData)
    .then((product) => res.status(200).send({ result: 200, data: product }))
    .catch((error) => {
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).send("The product name is exsited already!");
      } else {
        res.status(500).send({ result: 500, data: error });
      }
    });
};

const getProductsByCategory = (req, res) => {
  const category = req.params.category;
  Model.Product.findAll({
    where: { category: category },
    include: [{ model: Model.Rate }],
  }).then((products) => res.status(200).send({ result: 200, data: products }));
};

const getProductWithRate = (req, res) => {
  Model.Product.findAll({
    include: [
      {
        model: Model.Rate,
        attributes: ["rate"],
      },
    ],
  })
    .then((response) => {
      console.log(response);
      res.status(200).json({ result: 200, data: response });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ result: 500, data: error });
    });
};

const getProductById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Model.Product.findByPk(id, {
    include: [
      {
        model: Model.Rate,
        attributes: ["rate"],
      },
      {
        model: Model.Comment,
      },
    ],
  })
    .then((response) => {
      res.status(200).json({ result: 200, data: response });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ result: 500, data: error });
    });
};

const updateProduct = (req, res) => {
  const productid = req.params.id;
  const updateData = req.body;
  Model.Product.update(updateData, { where: { id: productid } })
    .then((response) => {
      console.log(response);
      res.status(200).json({ result: 200, data: response });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ result: 500, data: error });
    });
};

const getAllAvailableProduct = (req, res) => {
  Model.Product.findAll({
    where: { available: true },
    include: [{ model: Model.Rate }],
  }).then((products) => res.status(200).send({ result: 200, data: products }));
};

const getAvailableProductByCategory = (req, res) => {
  const category = req.params.category;
  Model.Product.findAll({
    where: {
      category: category,
      available: true,
    },
    include: [{ model: Model.Rate }],
  }).then((products) => res.status(200).send({ result: 200, data: products }));
};

module.exports = {
  getAllProducts,
  addNewProduct,
  getProductsByCategory,
  getProductWithRate,
  getProductById,
  updateProduct,
  getAllAvailableProduct,
  getAvailableProductByCategory
};
