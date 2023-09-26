const Model = require("../models")

const getAllProducts = (req,res) => {
    Model.Product.findAll({})
    .then(products => res.status(200).send({reslt:200 , data:products}))
    .catch(error => res.send({result:500 , data:error}))
}

const addNewProduct = (req,res) => {
    console.log(req.file.path)
    console.log(req.body.name)
    const productData = {
        name : req.body.name,
        barcode : req.body.barcode,
        category : req.body.category,
        price : req.body.price,
        unit : req.body.unit,
        stock : req.body.stock,
        description : req.body.description,
        picFile : req.file.path,
        available : req.body.available
    }

    Model.Product.create(productData)
    .then((product) => res.status(200).send({ result: 200, data: product }))
    .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send("The product name is exsited already!");
          } else {
            res.status(500).send({ result: 500, data: error });
          }
    });
}

const getProductsByCategory = (req,res) => {
    const category = req.params.category;
    Model.Product.findAll({where: {category : category}})
    .then(products => res.status(200).send({result:200 , data : products}))
}

module.exports = {getAllProducts , addNewProduct , getProductsByCategory}