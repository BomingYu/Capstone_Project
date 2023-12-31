const { where } = require("sequelize");
const Model = require("../models")

const getAllComments = (req,res) => {
    Model.Comment.findAll({})
    .then(response => {
        console.log(response);
        res.status(200).json({result:200 , data:response})
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({result:500, data:error})
    })
}

const addComent = (data , res) => {
    console.log(data)
    Model.Comment.create(data)
    .then(response => res.status(200).json({result:200 , data:response}))
    .catch(error => {
        console.error("Error creating comment:", error);
        res.status(500).json({ result: 500, data: error.message });
      })      
}

const deleteComment = (req,res) => {
    const commentid = req.params.id;
    Model.Comment.destroy({where:{id:commentid}})
    .then(response => {
        console.log(response);
        res.status(200).json({result:200 , data:response})
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({result:500, data:error})
    })
}

module.exports = {getAllComments , addComent , deleteComment}