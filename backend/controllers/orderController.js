const Model = require("../models")

const getAllOrders = (req,res) => {
    Model.Order.findAll({})
    .then(response => res.status(200).json({result:200 , data:response}))
    .catch(error => res.status(500).send({result:500 , data:error}))
}

const createOrder = (data , res) => {
    Model.Order.create(data)
    .then(response => res.status(200).json({result:200 , data:response}))
    .catch(error => res.status(500).send({result:500 , data:error}))
}

const getOrdersByUser = (req,res) => {
    const userid = req.params.userid;
    Model.Order.findAll({where:{userid : userid}})
    .then(response => res.status(200).json({result:200 , data:response}))
    .catch(error => res.status(500).send({result:500 , data:error}))
}

const updateOrder = (req,res) => {
    const id = req.params.id;
    const data = req.body;
    Model.Order.update(data , {where:{id : id}})
    .then(response => res.status(200).json({result:200 , data:response}))
    .catch(error => res.status(500).send({result:500 , data:error}))
}

const setOrderProcessing = (req,res) => {
    const id = req.params.id;
    Model.Order.update({orderstatus:"Processing"} , {where:{id:id}})
    .then(response => res.status(200).json({result:200 , data:response}))
    .catch(error => res.status(500).send({result:500 , data:error}))
}

const setOrderShipping = (req, res) => {
    const id = req.params.id;
    Model.Order.update({orderstatus:"Shipping"} , {where:{id:id}})
    .then(response => res.status(200).json({result:200 , data:response}))
    .catch(error => res.status(500).send({result:500 , data:error}))
}

const setOrderCompleted = (req,res) => {
    const id = req.params.id;
    Model.Order.update({orderstatus:"Completed"} , {where:{id:id}})
    .then(response => res.status(200).json({result:200 , data:response}))
    .catch(error => res.status(500).send({result:500 , data:error}))
}

const setOrderCandelled = (req,res) => {
    const id = req.params.id;
    Model.Order.update({orderstatus:"Cancelled"} , {where:{id:id}})
    .then(response => res.status(200).json({result:200 , data:response}))
    .catch(error => res.status(500).send({result:500 , data:error}))
}

module.exports={getAllOrders , createOrder , getOrdersByUser , updateOrder , setOrderProcessing , setOrderShipping , setOrderCompleted , setOrderCandelled}