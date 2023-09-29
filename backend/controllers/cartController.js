const Model = require("../models")

const getAllCart = (req,res) =>{
    Model.Cart.findAll({})
    .then(response => {
        console.log(response);
        res.status(200).json({result:200 , data:response})
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({result:500, data:error})
    })
}

const addToCart = (data , res) => {
    console.log(data.userid);
    console.log(data.productid);

    Model.Cart.findOrCreate({where:{userid:data.userid , productid:data.productid} , defaults:data})
    .then(([cart, created]) => {
        if (created) {
            res.status(200).json({result:200 , data:"The product has been added"})
        } else {
          cart.update({ quantity: Number(cart.quantity) + 1 })
          .then(updatedCart => res.status(200).json({result:200 , data:updatedCart}))
          .catch(error => res.status(500).json({result:500 , data:error.message}));
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ result: 500, data: error.message });
      });  
}

const getCartByUser = (req,res) => {
    const userid = req.params.userid;
    console.log(userid)
    Model.Cart.findAll({
        where : {userid : userid},
        include : [{
            model : Model.Product,
        }]
    })
    .then(response => {
        res.status(200).json({result:200 , data : response})
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({result:500, data:error})
    })
}

const deleteCart = (req,res) => {
    const cartid = req.params.id;
    Model.Cart.destroy({where:{id : cartid}})
    .then(response => res.status(200).send({result:200 , data:response}))
    .catch(error => res.status(500).send({result:500 , data:error}))
}

const updateCart = (req,res) => {
    const cartid = req.params.id;
    const cartData = req.body;
    Model.Cart.update(cartData , {where: {id : cartid}})
    .then(response => res.status(200).send({result:200 , data:response}))
    .catch(error => res.status(500).send({result:500 , data:error}))
}

module.exports = {getAllCart , addToCart , getCartByUser , deleteCart , updateCart}