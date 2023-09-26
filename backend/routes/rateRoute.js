const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.post("/addRate" , (req,res) => {
    Controller.rateController.addRate(req.body , res)
})

module.exports = router