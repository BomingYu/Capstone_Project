const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.post("/setRate" , (req,res) => {
    console.log(req.body.rate)
    Controller.rateController.setRate(req.body , res)
})

module.exports = router