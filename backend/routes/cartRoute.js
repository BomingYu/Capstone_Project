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

module.exports = router;