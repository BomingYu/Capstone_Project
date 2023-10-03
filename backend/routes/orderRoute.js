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

router.get("/orderByorderid/:id" , (req,res) => {
    Controller.orderController.getOrderByOrderid(req,res)
})

router.put("/update/:id" , (req,res) => {
    Controller.orderController.updateOrder(req,res)
})

router.put("/setOrderPending/:id" , (req,res) => {
    Controller.orderController.setOrderPending(req,res)
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

router.get('/getOrderByState/:status' , (req,res) => {
    Controller.orderController.getAllorderByStatus(req,res)
})

router.get("/getOrderByPayment/:payment" , (req,res) => {
    Controller.orderController.getOrderByPayment(req,res)
})

router.get("/getOrderByDeliver/:deliver" , (req,res) => {
    Controller.orderController.getOrderByDeliver(req,res)
})

router.get("/getOrderByUser/:userid/ByStatus/:status" , (req,res) => {
    Controller.orderController.getOrderByUserByStatus(req,res)
})

router.get("/getOrderByUser/:userid/ByPaymnet/:payment" , (req,res) => {
    Controller.orderController.getOrderByUserByPayment(req,res)
})

router.get("/getOrderByUser/:userid/ByDeliver/:deliver" , (req,res) => {
    Controller.orderController.getOrderByUserByDeliver(req,res)
})

module.exports=router