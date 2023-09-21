const Controller = require("../controllers");
const express = require("express")
const router = express.Router();

router.get("/" , (req,res) => {
    Controller.userController.getAllUsers(req,res)
})

router.post("/signup" , (req,res) => {
    Controller.userController.createUser(req.body , res);
})

router.post("/login", (req,res) => {
    Controller.userController.loginUser(req.body , res);
})

module.exports = router;