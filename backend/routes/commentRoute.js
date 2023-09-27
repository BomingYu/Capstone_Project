const Controller = require("../controllers")
const express = require("express")
const router = express.Router();

router.get("/" , (req , res) => {
    Controller.commentController.getAllComments(req , res)
})

router.post("/addComment" , (req,res) => {
    Controller.commentController.addComent(req.body , res)
})

module.exports = router;