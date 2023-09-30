const express = require("express")
const router = express.Router();
const Controller = require("../controllers")

router.get("/" , (req,res) => {
    Controller.cartController.getAllCart(req,res)
})

router.post("/add" , (req , res) => {
    Controller.cartController.addToCart(req.body , res)
})

router.get("/:userid" , (req,res) => {
    Controller.cartController.getCartByUser(req,res)
})

router.delete("/delete/:id" , (req,res) => {
    Controller.cartController.deleteCart(req,res)
})

router.delete("/deleteCartByUser/:userid" , (req,res) => {
    Controller.cartController.deleteCartByUser(req,res)
})

router.put("/update/:id" , (req,res) => {
    Controller.cartController.updateCart(req , res)
})

module.exports = router;