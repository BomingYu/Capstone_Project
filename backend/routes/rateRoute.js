const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.post("/setRate" , (req,res) => {
    console.log(req.body.rate)
    Controller.rateController.setRate(req.body , res)
})

router.delete("/resetLike/:productid" , (req,res) => {
    Controller.rateController.resetProductLike(req,res)
})

router.delete("/resetUnlike/:productid" , (req,res) => {
    Controller.rateController.resetProductUnlike(req,res)
})

module.exports = router