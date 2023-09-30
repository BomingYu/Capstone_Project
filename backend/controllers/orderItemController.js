const Model = require("../models")

const getAllOrderItems = (req,res) => {
    Model.OrderItem.findAll({})
    .then(orderItems => res.status(200).json({result:200 , data:orderItems}))
    .catch(error => res.status(500).send({result : 500 , data:error}))
}

const getOrderItemByOrderid = (req,res) => {
    const orderid = req.params.orderid;
    Model.OrderItem.findAll({
        where: {orderid:orderid},
        include:[{
            model : Model.Product,
        }]
    })
    .then(orderItems => res.status(200).json({result:200 , data:orderItems}))
    .catch(error => res.status(500).send({result : 500 , data:error}))
}

const createOrderItem = (data,res) => {
    Model.OrderItem.create(data)
    .then(orderItems => res.status(200).json({result:200 , data:orderItems}))
    .catch(error => res.status(500).send({result : 500 , data:error}))
}

const createMultiItems = (data , res) => {
    Model.OrderItem.bulkCreate(data)
    .then(orderItems => res.status(200).json({result:200 , data:orderItems}))
    .catch(error => res.status(500).send({result : 500 , data:error}))
}

module.exports={getAllOrderItems , createOrderItem , createMultiItems , getOrderItemByOrderid}