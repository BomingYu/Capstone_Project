const express = require("express");
const router = express.Router();
const Controller = require("../controllers")

router.get("/" , (req,res) => {
    Controller.orderController.getAllOrders(req,res)
})

router.post("/" , (req,res) => {
    Controller.orderController.createOrder(req.body , res)
})

router.get("/orderByUser/:userid" , (req,res) => {
    Controller.orderController.getOrdersByUser(req,res)
})

router.put("/update/:id" , (req,res) => {
    Controller.orderController.updateOrder(req,res)
})

router.put("/setOrderProcessing/:id" , (req,res) => {
    Controller.orderController.setOrderProcessing(req,res)
})

router.put("/setOrderShipping/:id" , (req,res) => {
    Controller.orderController.setOrderShipping(req,res)
})

router.put("/setOrderCompleted/:id" , (req,res) => {
    Controller.orderController.setOrderCompleted(req,res)
})

router.put("/setOrderCancelled/:id" , (req,res) => {
    Controller.orderController.setOrderCandelled(req,res)
})

module.exports=router