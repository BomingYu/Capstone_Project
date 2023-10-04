const Controller = require("../controllers");
const {verifyToken} = require('../middleware/userAuth')
const express = require("express")
const router = express.Router();


router.get("/" , verifyToken , (req,res) => {
    Controller.userController.getUsers(req,res)
})

router.post("/signup" , (req,res) => {
    Controller.userController.createUser(req.body , res);
})

router.post("/login" , (req,res) => {
    Controller.userController.loginUser(req , res);
})

router.put("/:id" , (req, res) => {
    Controller.userController.changeUserSetting(req,res);
})

module.exports = router;