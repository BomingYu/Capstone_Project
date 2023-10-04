require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token){
        return res.status(403).send("A token is required for authentication");
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_KEY);
        req.user = decoded;
        console.log(decoded)
    }
    catch(error){
        return res.status(401).send("Invalid Token");
    }
    return next();
}

const createToken = (userid , useremail) => {
    const token = jwt.sign(
        {user_id : userid , useremail},
        process.env.JWT_KEY,
        {expiresIn : "1h"}
    )
    return token;
}

module.exports = {verifyToken , createToken}