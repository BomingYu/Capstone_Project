const Model = require("../models");
const { Op } = require("sequelize");

const getAllOrders = (req, res) => {
  Model.Order.findAll({})
    .then((response) => res.status(200).json({ result: 200, data: response }))
    .catch((error) => res.status(500).send({ result: 500, data: error }));
};

const createOrder = (data, res) => {
  Model.Order.create(data)
    .then((response) => res.status(200).json({ result: 200, data: response }))
    .catch((error) => res.status(500).send({ result: 500, data: error }));
};

const getOrdersByUser = (req, res) => {
  const userid = req.params.userid;
  Model.Order.findAll({ where: { userid: userid } })
    .then((response) => res.status(200).json({ result: 200, data: response }))
    .catch((error) => res.status(500).send({ result: 500, data: error }));
};

const getOrderByOrderid = (req, res) => {
  const id = req.params.id;
  Model.Order.findByPk(id, {
    include: [{ model: Model.OrderItem }],
  })
    .then((response) => res.status(200).json({ result: 200, data: response }))
    .catch((error) => res.status(500).send({ result: 500, data: error }));
};

const updateOrder = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Model.Order.update(data, { where: { id: id } })
    .then((response) => res.status(200).json({ result: 200, data: response }))
    .catch((error) => res.status(500).send({ result: 500, data: error }));
};

const setOrderPending = (req, res) => {
  const id = req.params.id;
  Model.Order.update({ orderstatus: "Pending" }, { where: { id: id } })
    .then((response) => res.status(200).json({ result: 200, data: response }))
    .catch((error) => res.status(500).send({ result: 500, data: error }));
};

const setOrderProcessing = (req, res) => {
  const id = req.params.id;
  Model.Order.update({ orderstatus: "Processing" }, { where: { id: id } })
    .then((response) => res.status(200).json({ result: 200, data: response }))
    .catch((error) => res.status(500).send({ result: 500, data: error }));
};

const setOrderShipping = (req, res) => {
  const id = req.params.id;
  Model.Order.update({ orderstatus: "Shipping" }, { where: { id: id } })
    .then((response) => res.status(200).json({ result: 200, data: response }))
    .catch((error) => res.status(500).send({ result: 500, data: error }));
};

const setOrderCompleted = (req, res) => {
  const id = req.params.id;
  Model.Order.update({ orderstatus: "Completed" }, { where: { id: id } })
    .then((response) => res.status(200).json({ result: 200, data: response }))
    .catch((error) => res.status(500).send({ result: 500, data: error }));
};

const setOrderCandelled = (req, res) => {
  const id = req.params.id;
  Model.Order.update({ orderstatus: "Cancelled" }, { where: { id: id } })
    .then((response) => res.status(200).json({ result: 200, data: response }))
    .catch((error) => res.status(500).send({ result: 500, data: error }));
};

const getAllorderByStatus = (req, res) => {
  const status = req.params.status;
  Model.Order.findAll({ where: { orderstatus: status } })
    .then((response) => res.status(200).json({ result: 200, data: response }))
    .catch((error) => res.status(500).send({ result: 500, data: error }));
};

const getOrderByUserByStatus = (req, res) => {
  const userid = req.params.userid;
  const status = req.params.status;
  Model.Order.findAll({where:{
    userid : userid,
    orderstatus : status
  }})
  .then((response) => res.status(200).json({ result: 200, data: response }))
  .catch((error) => res.status(500).send({ result: 500, data: error }));
};

const getOrderByPayment = (req,res) => {
    const payment = req.params.payment
    Model.Order.findAll({where:{payment : payment}})
    .then((response) => res.status(200).json({ result: 200, data: response }))
  .catch((error) => res.status(500).send({ result: 500, data: error }));
}

const getOrderByDeliver = (req,res) => {
    const deliver = req.params.deliver;
    Model.Order.findAll({where:{delivery : deliver}})
    .then((response) => res.status(200).json({ result: 200, data: response }))
  .catch((error) => res.status(500).send({ result: 500, data: error }));
}

const getOrderByUserByPayment = (req,res) => {
    const userid = req.params.userid
    const payment = req.params.payment
    Model.Order.findAll({where:{
        userid : userid,
        payment:payment
    }})
    .then((response) => res.status(200).json({ result: 200, data: response }))
  .catch((error) => res.status(500).send({ result: 500, data: error }));
}

const getOrderByUserByDeliver = (req,res) => {
    const userid = req.params.userid
    const deliver = req.params.deliver
    Model.Order.findAll({where:{
        userid : userid,
        delivery : deliver
    }})
    .then((response) => res.status(200).json({ result: 200, data: response }))
  .catch((error) => res.status(500).send({ result: 500, data: error }));
}

module.exports = {
  getAllOrders,
  createOrder,
  getOrdersByUser,
  updateOrder,
  setOrderPending,
  setOrderProcessing,
  setOrderShipping,
  setOrderCompleted,
  setOrderCandelled,
  getOrderByOrderid,
  getAllorderByStatus,
  getOrderByUserByStatus,
  getOrderByPayment,
  getOrderByDeliver,
  getOrderByUserByPayment,
  getOrderByUserByDeliver
};
