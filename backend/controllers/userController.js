const Model = require("../models/index");
const bcrypt = require("bcryptjs");

const getAllUsers = (req,res) => {
    Model.User.findAll({})
    .then(users => res.send({result:200 , data: users}))
    .catch(error => res.send({result:500 , error:error}))
}

const createUser = (data , res) => {
    const saltRounds = 10;
    const password = data.password;
    const hashedPassword = bcrypt.hashSync(password , saltRounds)
    console.log(password);
    data.password = hashedPassword;
    Model.User.create(data)
    .then(user => res.send({result:200 , data:user}))
    .catch(error => res.send({result:500 , data:error}))
}

const loginUser = (data , res) => {
    const email = data.email;
    const pword = data.password;
    Model.User.findOne({where : {email : email}})
    .then(user => {
        const hashedPassword = user.password;
        const passworMatch = bcrypt.compareSync(pword , hashedPassword);
        if(passworMatch){
            res.send({result:200 , data:user});
        }
        else{
            res.sned({result : 400 , data:"Incorrect password"})
        }
    })
    .catch(error => res.send({result : 500 , data:error}))
}

module.exports = {getAllUsers , createUser , loginUser}