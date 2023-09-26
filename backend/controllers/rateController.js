const Model = require("../models")

const addRate = (data , res) => {
    Model.Rate.create(data)
    .then(response => res.status(200).send({result : 200 , data:response}))
    .catch((error) => res.send({ result: 500, error: error }))
}

module.exports = {addRate};