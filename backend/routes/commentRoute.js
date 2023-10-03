const Controller = require("../controllers")
const express = require("express")
const router = express.Router();

router.get("/" , (req , res) => {
    Controller.commentController.getAllComments(req , res)
})

router.post("/addComment" , (req,res) => {
    Controller.commentController.addComent(req.body , res)
})

router.delete("/:id" , (req,res) => {
    Controller.commentController.deleteComment(req,res)
})

module.exports = router;