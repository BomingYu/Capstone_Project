const Controller = require("../controllers")
const express = require("express")
const router = express.Router();
const {uploadFile} = require("../middleware/uploadProduct")

router.get("/" , (req,res) => {
    Controller.productController.getAllProducts(req,res)
})

router.post("/add" , uploadFile , (req,res) => {
    Controller.productController.addNewProduct(req,res)
})

router.get("/byCategory/:category" , (req,res) => {
    Controller.productController.getProductsByCategory(req,res)
})

module.exports = router;