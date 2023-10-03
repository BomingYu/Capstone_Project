const Model = require("../models")

const setRate = (data , res) => {
    console.log(data.userid)
    console.log(data.productid)
    console.log(data.rate)

    Model.Rate.findOrCreate({where : {userid : data.userid , productid : data.productid},defaults:data})
    .then(([rate , created]) => {
        console.log(data.rate)
        if(created){
            
            res.status(201).json({result:201 , data:"You've rated this product!"})
        }
        else{
            
            rate.update({rate:String(data.rate)})
            .then(rate => res.status(200).json({result:200 , data:rate}))
            .catch(error => res.status(404).json({result:404 , data:error.message}))
        }
    })
    .catch(error => {
        console.log(data.rate)
        res.status(500).json({result:500 , data:error.message})
    });
}

const resetProductLike = (req,res) => {
    const productid = req.params.productid
    Model.Rate.destroy({where:{
        productid:productid,
        rate : "up"
    }})
    .then(response => {
        console.log(response);
        res.status(200).json({result:200 , data:response})
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({result:500, data:error})
    })
}

const resetProductUnlike = (req , res) => {
    const productid = req.params.productid
    Model.Rate.destroy({where:{
        productid:productid,
        rate : "down"
    }})
    .then(response => {
        console.log(response);
        res.status(200).json({result:200 , data:response})
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({result:500, data:error})
    })
}

module.exports = {setRate , resetProductLike , resetProductUnlike};