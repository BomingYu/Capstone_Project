require("dotenv").config();
const express = require("express");
let dbConnect = require("./dbConnect");
const userRoute = require("./routes/userRoute")
const cors = require("cors")
const productRoute = require("./routes/productRoute")
const rateRoute = require("./routes/rateRoute")
const commentRoute = require("./routes/commentRoute")
const cartRoute = require("./routes/cartRoute")
const orderRoute = require("./routes/orderRoute")
const orderItemRoute = require("./routes/orderItemRoute")

const app = express();
app.use(express.json());
app.use(cors());
app.use("/public" , express.static("public"))

const PORT = 8080;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//app.use(express.json());

app.use("/users", userRoute);
app.use("/products" , productRoute);
app.use("/rates" , rateRoute);
app.use("/comments" , commentRoute);
app.use("/carts" , cartRoute);
app.use("/orders" , orderRoute);
app.use("/orderItems" , orderItemRoute);


app.listen(PORT, () => {
    console.log("Listen on port " + PORT)
})