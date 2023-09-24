const Model = require("../models")

const getAllProducts = (req,res) => {
    Model.Product.findAll({})
    .then(products => res.send({reslt:200 , data:products}))
    .catch(error => res.send({result:500 , data:error}))
}

const addNewProduct = (req,res) => {
    console.log(req.file)
    res.send("response from controller, checking the req now")
}

module.exports = {getAllProducts , addNewProduct}