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

router.get("/getProductWithRate" , (req,res) => {
    Controller.productController.getProductWithRate(req,res)
})

router.get("/byId/:id" , (req,res) => {
    Controller.productController.getProductById(req,res)
})

router.put("/update/:id" ,(req,res) => {
    Controller.productController.updateProduct(req , res)
})

router.get('/getAvailableOnly' , (req,res) => {
    Controller.productController.getAllAvailableProduct(req,res)
})

router.get("/getAvailableProductByCategory/:category" , (req,res) => [
    Controller.productController.getAvailableProductByCategory(req,res)
])

router.get("/getProductsByAvailable/:available" , (req,res) => {
    Controller.productController.getProductsByAvailable(req,res)
})

module.exports = router;