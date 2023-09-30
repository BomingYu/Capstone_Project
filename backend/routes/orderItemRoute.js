const express = require("express");
const router = express.Router();
const Controller = require("../controllers")

router.get("/" , (req,res) => {
    Controller.orderItemController.getAllOrderItems(req,res)
})

router.post("/addItem" , (req,res) => {
    Controller.orderItemController.createOrderItem(req.body , res)
})

router.post("/addItemsOnce" , (req,res) => {
    Controller.orderItemController.createMultiItems(req.body , res)
})

router.get("/getOrderItemsbyOrderid/:orderid" , (req,res) => {
    Controller.orderItemController.getOrderItemByOrderid(req,res)
})

module.exports=router;